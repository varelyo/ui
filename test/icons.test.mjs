import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { readIcons, validateIconSource } from '../scripts/icons/validate.mjs';

const wrap = (body, attributes = 'fill="none" stroke="currentColor"') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${attributes}>${body}</svg>`;
const codes = (name, source) =>
  validateIconSource(name, source).findings.map((finding) => finding.code);

const broken = {
  'icon-name': ['Icon2', wrap('<path d="M5 12H19"/>')],
  'icon-invalid-xml': [
    'fixture',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 12H19">',
  ],
  'icon-viewbox': ['fixture', wrap('<path d="M5 12H19"/>').replace('0 0 24 24', '0 0 20 20')],
  'icon-root-paint': [
    'fixture',
    wrap('<path d="M5 12H19"/>', 'fill="currentColor" stroke="currentColor"'),
  ],
  'icon-forbidden-attribute': ['fixture', wrap('<path d="M5 12H19" stroke-width="2"/>')],
  'icon-forbidden-element': ['fixture', wrap('<rect x="4" y="4" width="16" height="16"/>')],
  'icon-path-syntax': ['fixture', wrap('<path d="M5 12 X19"/>')],
  'icon-path-complexity': ['fixture', wrap(`<path d="M4 12${'H20H4'.repeat(41)}"/>`)],
  'icon-outside-live-area': ['fixture', wrap('<path d="M1 12H19"/>')],
  'icon-sharp-corner': ['fixture', wrap('<path d="M6 9L12 15L18 9"/>')],
  'icon-corner-radius': ['fixture', wrap('<path d="M6 9L11.8 14.8Q12 15 12.2 14.8L18 9"/>')],
  'icon-empty': ['fixture', wrap('')],
};
for (const [code, [name, source]] of Object.entries(broken))
  test(`broken icon fixture reports ${code}`, () => {
    assert.ok(codes(name, source).includes(code), JSON.stringify(codes(name, source)));
  });

test('transforms, inline styles, raster images and embedded CSS are refused', () => {
  for (const body of [
    '<path d="M5 12H19" transform="rotate(45)"/>',
    '<path d="M5 12H19" style="stroke:red"/>',
    '<image href="data:image/png;base64,AAAA"/>',
    '<style>path{stroke-width:3}</style>',
    '<g><path d="M5 12H19"/></g>',
  ])
    assert.ok(
      codes('fixture', wrap(body)).some((code) => code.startsWith('icon-forbidden')),
      body,
    );
  assert.ok(
    codes('fixture', `<!-- note -->${wrap('<path d="M5 12H19"/>')}`).includes(
      'icon-forbidden-element',
    ),
  );
  assert.ok(
    codes(
      'fixture',
      wrap('<path d="M5 12H19"/>', 'fill="none" stroke="currentColor" class="x"'),
    ).includes('icon-forbidden-attribute'),
  );
});

test('a closed shape is checked where it closes', () => {
  assert.ok(codes('fixture', wrap('<path d="M5 5H19V19H5Z"/>')).includes('icon-sharp-corner'));
  assert.deepEqual(
    codes('fixture', wrap('<path d="M8 5H16Q19 5 19 8V16Q19 19 16 19H8Q5 19 5 16V8Q5 5 8 5Z"/>')),
    [],
  );
});

test('directory checks reject duplicate artwork and inventory drift', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'varelyo-icons-'));
  await mkdir(path.join(directory, 'icons'));
  await writeFile(path.join(directory, 'icons/first.svg'), wrap('<path d="M5 12H19"/>'));
  await writeFile(path.join(directory, 'icons/second.svg'), wrap('<path d="M5 12H19"/>'));
  await writeFile(
    path.join(directory, 'icons.json'),
    JSON.stringify([{ name: 'first' }, { name: 'third' }]),
  );
  const { findings } = await readIcons(directory);
  const found = findings.map((finding) => `${finding.code}:${finding.icon}`);
  assert.ok(found.includes('icon-duplicate-artwork:second'));
  assert.ok(found.includes('icon-inventory-drift:second'));
  assert.ok(found.includes('icon-inventory-drift:third'));
});
