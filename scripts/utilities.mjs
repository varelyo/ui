import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { compile } from 'tailwindcss';
import { filesUnder, root } from './io.mjs';

const sourceFolders = ['src/components', 'src/utils', 'src/hooks', 'src/types'];
const logical = new Set([
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
]);

export function classLiterals(file, source) {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const literals = [];
  const problems = [];
  const where = (node) => `${file}:${tree.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
  const styles = file.endsWith('.styles.ts');
  const collect = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      literals.push({ text: node.text, where: where(node) });
    else if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map((span) => span.literal.text)];
      if (parts.some((part) => part.trim()))
        problems.push(`${where(node)}: class names are built by concatenation`);
    } else if (ts.isParenthesizedExpression(node)) collect(node.expression);
    else if (ts.isConditionalExpression(node)) {
      collect(node.whenTrue);
      collect(node.whenFalse);
    } else if (ts.isBinaryExpression(node) && logical.has(node.operatorToken.kind)) {
      if (node.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) collect(node.left);
      collect(node.right);
    } else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)
      problems.push(`${where(node)}: class names are built by concatenation`);
  };
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'cx'
    )
      node.arguments.forEach(collect);
    if (styles && ts.isPropertyAssignment(node) && ts.isObjectLiteralExpression(node.parent))
      collect(node.initializer);
    if (ts.isJsxAttribute(node) && node.name.getText(tree) === 'className' && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) collect(node.initializer);
      else if (ts.isJsxExpression(node.initializer) && node.initializer.expression)
        collect(node.initializer.expression);
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { literals, problems };
}

const escapeClass = (name) => name.replace(/[^a-zA-Z0-9_-]/g, (character) => `\\${character}`);
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function kitStylesheet(directory = root) {
  const entry = path.join(directory, 'src/theme.css');
  return compile(await readFile(entry, 'utf8'), {
    base: path.dirname(entry),
    loadStylesheet: async (id, base) => {
      const file = id.startsWith('.')
        ? path.resolve(base, id)
        : path.join(directory, 'node_modules', id === 'tailwindcss' ? 'tailwindcss/index.css' : id);
      return { path: file, base: path.dirname(file), content: await readFile(file, 'utf8') };
    },
  });
}

function mapClasses(value, into = new Set()) {
  if (typeof value === 'string') {
    for (const part of value.split(/\s+/)) if (part) into.add(part);
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) mapClasses(item, into);
  }
  return into;
}

function generatedClasses(maps) {
  const into = new Set();
  mapClasses(maps.layout, into);
  for (const value of Object.values(maps))
    if (value && typeof value === 'object' && 'variants' in value) {
      mapClasses(value.slots, into);
      mapClasses(value.variants, into);
      mapClasses(value.sizes, into);
      mapClasses(value.styleSizes, into);
    }
  return into;
}

async function collectOrigins(directory) {
  const problems = [];
  const origins = new Map();
  for (const folder of sourceFolders)
    for (const file of await filesUnder(path.join(directory, folder))) {
      if (!/\.tsx?$/.test(file)) continue;
      const relative = path.relative(directory, file);
      const source = await readFile(file, 'utf8');
      if (/from\s+['"][^'"]*generated\/raw\//.test(source))
        problems.push(`${relative}: components never import raw-value modules`);
      const found = classLiterals(relative, source);
      problems.push(...found.problems);
      for (const { text, where } of found.literals)
        for (const candidate of text.split(/\s+/).filter(Boolean))
          if (!origins.has(candidate)) origins.set(candidate, where);
    }
  const maps = await import(pathToFileURL(path.join(directory, 'src/generated/maps.ts')).href);
  for (const candidate of generatedClasses(maps))
    if (!origins.has(candidate)) origins.set(candidate, 'src/generated/maps.ts');
  return { problems, origins };
}

const unescapeClass = (name) =>
  name
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/\\(.)/g, '$1');

export function cssClasses(css) {
  const classes = new Set();
  for (const [, prelude] of css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .matchAll(/(?:^|[{};])\s*([^{};]+)\{/g)) {
    if (prelude.trim().startsWith('@')) continue;
    for (const [, name] of prelude.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g))
      classes.add(unescapeClass(name));
  }
  return classes;
}

export async function strayClasses(css, directory = root) {
  const { origins } = await collectOrigins(directory);
  return [...cssClasses(css)].filter((name) => !origins.has(name)).sort();
}

export async function checkUtilities(directory = root) {
  const { problems, origins } = await collectOrigins(directory);
  const compiler = await kitStylesheet(directory);
  const css = compiler.build([...origins.keys()]);
  for (const [candidate, where] of origins) {
    if (/[[\]]/.test(candidate)) problems.push(`${where}: arbitrary value ${candidate}`);
    else if (/(^|:)(dark|light):/.test(candidate))
      problems.push(
        `${where}: mode-specific class ${candidate}; modes differ only by token values`,
      );
    else if (
      !new RegExp(`\\.${escapeRegExp(escapeClass(candidate))}(?![a-zA-Z0-9_\\\\-])`).test(css)
    )
      problems.push(`${where}: ${candidate} is not a utility of the kit's theme`);
  }
  return { checked: origins.size, problems };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await checkUtilities();
  if (result.problems.length) {
    console.error(result.problems.join('\n'));
    process.exitCode = 1;
  } else console.log(`utilities: ${result.checked} class names generate kit CSS`);
}
