import test from 'node:test';
import assert from 'node:assert/strict';
import { architectureFindings } from '../scripts/architecture.mjs';
import { classLiterals } from '../scripts/utilities.mjs';

test('architecture guard reports layout, hook, import and cycle violations', () => {
  const component = (folder, name, overrides = {}) => ({
    [`${folder}/${name}.tsx`]: `import { use${name} } from './hooks';\nexport function ${name}() {\n  use${name}();\n  return null;\n}\n`,
    [`${folder}/${name}.types.ts`]: 'export type Props = object;\n',
    [`${folder}/${name}.stories.tsx`]: 'export const story = {};\n',
    [`${folder}/index.ts`]: `export { ${name} } from './${name}';\n`,
    ...overrides,
  });
  assert.deepEqual(
    architectureFindings({
      ...component('src/components/Alpha', 'Alpha'),
      'src/utils/index.ts': 'export const one = 1;\n',
    }),
    [],
  );
  const findings = architectureFindings({
    ...component('src/components/Alpha', 'Alpha', {
      'src/components/Alpha/Alpha.tsx':
        "import { useState } from 'react';\nimport { Beta } from '../Beta/Beta';\nexport function Alpha() {\n  useState(0);\n  return Beta;\n}\n",
    }),
    'src/components/Beta/Beta.tsx':
      "import { Alpha } from '../Alpha';\nexport const Beta = Alpha;\n",
    'src/components/Beta/index.ts': "export { Beta } from './Beta';\n",
    'src/utils/index.ts':
      "import { Alpha } from '../components/Alpha';\nexport const one = Alpha;\n",
  }).join('\n');
  assert.match(findings, /src\/components\/Beta: missing Beta\.types\.ts/);
  assert.match(findings, /Alpha\.tsx: calls useState/);
  assert.match(findings, /imports src\/components\/Beta\/Beta; another component/);
  assert.match(findings, /src\/utils\/index\.ts: shared code imports src\/components\/Alpha/);
  assert.match(findings, /import cycle: /);
});

test('class maps in styles files are read as class names, and only there', () => {
  const source =
    "const sides = { horizontal: 'border-x-0 border-b-0', vertical: 'border-y-0 border-r-0' };\nexport const line = (side) => cx('flex-1', sides[side]);\n";
  const texts = (file) => classLiterals(file, source).literals.map(({ text }) => text);
  assert.deepEqual(texts('src/components/Alpha/Alpha.styles.ts'), [
    'border-x-0 border-b-0',
    'border-y-0 border-r-0',
    'flex-1',
  ]);
  assert.deepEqual(texts('src/components/Alpha/hooks/useAlpha.ts'), ['flex-1']);
});
