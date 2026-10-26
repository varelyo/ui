import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { filesUnder, root } from './io.mjs';

const componentRoots = ['src/components'];
const sharedRoots = ['src/hooks', 'src/utils', 'src/types'];
const checkedRoots = [...componentRoots, ...sharedRoots];
const importPattern =
  /(?:^|[;\s])(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g;
const ownHookImport = /import\s*{([^}]*)}\s*from\s*['"]\.\/hooks['"]/g;

const under = (file, roots) => roots.some((folder) => file.startsWith(`${folder}/`));
const componentFolderOf = (file) => {
  const parts = file.split('/');
  return under(file, componentRoots) && parts.length >= 3 ? parts.slice(0, 3).join('/') : null;
};

function resolve(files, from, specifier) {
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  return [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`].find((candidate) =>
    Object.hasOwn(files, candidate),
  );
}

function ownHooks(view) {
  const names = new Set();
  for (const match of view.matchAll(ownHookImport))
    for (const name of match[1].split(',')) if (name.trim()) names.add(name.trim());
  return names;
}

function folderFindings(files) {
  const findings = [];
  const folders = new Set(
    Object.keys(files)
      .map(componentFolderOf)
      .filter((folder) => folder !== null),
  );
  for (const folder of [...folders].sort()) {
    const name = folder.split('/')[2];
    for (const required of [`${name}.tsx`, `${name}.types.ts`, `${name}.stories.tsx`, 'index.ts'])
      if (!Object.hasOwn(files, `${folder}/${required}`))
        findings.push(`${folder}: missing ${required}`);
    const styles = files[`${folder}/${name}.styles.ts`] ?? '';
    if (
      styles.includes('componentTokens[') &&
      !/_COMPONENT_NAME_KEY\b/.test(files[`${folder}/${name}.constants.ts`] ?? '')
    )
      findings.push(`${folder}: selects component tokens without its NAME_COMPONENT_NAME_KEY`);
    const view = files[`${folder}/${name}.tsx`];
    if (view === undefined) continue;
    const allowed = ownHooks(view);
    for (const [, hook] of view.matchAll(/\b(use[A-Z]\w*)\s*\(/g))
      if (!allowed.has(hook))
        findings.push(`${folder}/${name}.tsx: calls ${hook}; a component calls only its own hooks`);
  }
  return findings;
}

function importFindings(files, graph) {
  const findings = [];
  for (const [file, source] of Object.entries(files)) {
    graph.set(file, []);
    if (file.endsWith('.stories.tsx')) continue;
    if (/\/hooks\/[^/]+\.tsx$/.test(file)) findings.push(`${file}: hooks never render JSX`);
    for (const [, specifier] of source.matchAll(importPattern)) {
      if (!specifier.startsWith('.')) continue;
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
      const resolved = resolve(files, file, specifier);
      if (resolved && !resolved.endsWith('.stories.tsx')) graph.get(file).push(resolved);
      if (under(file, sharedRoots) && under(`${target}/`, componentRoots))
        findings.push(`${file}: shared code imports ${target}`);
      const other = componentFolderOf(`${target}/`);
      if (other && other !== componentFolderOf(file) && target !== other)
        findings.push(
          `${file}: imports ${target}; another component is imported through its index`,
        );
    }
  }
  return findings;
}

function cycleFindings(graph) {
  const findings = [];
  const state = new Map();
  const visit = (file, trail) => {
    if (state.get(file) === 'done') return;
    if (state.get(file) === 'active') {
      findings.push(`import cycle: ${[...trail.slice(trail.indexOf(file)), file].join(' -> ')}`);
      return;
    }
    state.set(file, 'active');
    for (const next of graph.get(file) ?? []) visit(next, [...trail, file]);
    state.set(file, 'done');
  };
  for (const file of [...graph.keys()].sort()) visit(file, []);
  return findings;
}

export function architectureFindings(files) {
  const graph = new Map();
  return [...folderFindings(files), ...importFindings(files, graph), ...cycleFindings(graph)];
}

export async function checkArchitecture(directory = root) {
  const files = {};
  for (const folder of checkedRoots)
    for (const file of await filesUnder(path.join(directory, folder)))
      if (/\.tsx?$/.test(file))
        files[path.relative(directory, file).split(path.sep).join('/')] = await readFile(
          file,
          'utf8',
        );
  return { files: Object.keys(files).length, findings: architectureFindings(files) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await checkArchitecture();
  if (result.findings.length) {
    console.error(result.findings.join('\n'));
    process.exitCode = 1;
  } else console.log(`architecture: ${result.files} files follow the component rules`);
}
