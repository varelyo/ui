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
  'icon-element-paint': ['fixture', wrap('<circle cx="12" cy="12" r="3" fill="#000"/>')],
  'icon-open-fill': ['fixture', wrap('<path d="M6 12Q12 4 18 12" fill="currentColor"/>')],
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

const filledShapes = {
  path: '<path d="M9 6H15Q18 6 18 9V15Q18 18 15 18H9Q6 18 6 15V9Q6 6 9 6Z" fill="currentColor"/>',
  circle: '<circle cx="12" cy="12" r="3.6" fill="currentColor"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="7.2" ry="4.8" fill="currentColor"/>',
};

test('a path, circle or ellipse may be filled with the current colour', () => {
  for (const [tag, body] of Object.entries(filledShapes)) {
    const { findings, elements } = validateIconSource('fixture', wrap(body));
    assert.deepEqual(findings, [], tag);
    assert.equal(elements.length, 1, tag);
    assert.ok(Object.hasOwn(elements[0], tag), tag);
    assert.equal(elements[0].fill, 'currentColor', tag);
  }
  assert.deepEqual(
    validateIconSource('fixture', wrap('<circle cx="12" cy="12" r="3.6"/>')).elements,
    [{ circle: [12, 12, 3.6] }],
  );
});

test('a fill other than the current colour is refused on every shape', () => {
  for (const [tag, body] of Object.entries(filledShapes))
    for (const value of ['none', '#000', 'red', 'currentcolor', 'inherit', 'url(#paint)', ''])
      assert.deepEqual(
        codes('fixture', wrap(body.replace('fill="currentColor"', `fill="${value}"`))),
        ['icon-element-paint'],
        `${tag} fill="${value}"`,
      );
});

test('the root stays unfilled and other paint attributes stay refused on shapes', () => {
  assert.ok(
    codes(
      'fixture',
      wrap(filledShapes.circle, 'fill="currentColor" stroke="currentColor"'),
    ).includes('icon-root-paint'),
  );
  for (const attribute of [
    'stroke="none"',
    'fill-rule="evenodd"',
    'fill-opacity="0.5"',
    'opacity="0.5"',
    'color="red"',
  ])
    assert.deepEqual(
      codes('fixture', wrap(filledShapes.circle.replace('/>', ` ${attribute}/>`))),
      ['icon-forbidden-attribute'],
      attribute,
    );
});

test('a filled path keeps the corner rules and closes every subpath', () => {
  assert.ok(
    codes('fixture', wrap('<path d="M6 6H18V18H6Z" fill="currentColor"/>')).includes(
      'icon-sharp-corner',
    ),
  );
  assert.ok(
    codes(
      'fixture',
      wrap('<path d="M6 9L11.8 14.8Q12 15 12.2 14.8L18 9Q12 3 6 9Z" fill="currentColor"/>'),
    ).includes('icon-corner-radius'),
  );
  assert.deepEqual(codes('fixture', wrap('<path d="M6 12Q12 4 18 12"/>')), []);
  assert.deepEqual(
    codes(
      'fixture',
      wrap(
        '<path d="M9 6H15Q18 6 18 9V15Q18 18 15 18H9Q6 18 6 15V9Q6 6 9 6ZM6 20Q12 16 18 20" fill="currentColor"/>',
      ),
    ),
    ['icon-open-fill'],
  );
});
