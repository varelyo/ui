import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { exists, root } from '../io.mjs';
import { projectIcons } from './project.mjs';
import { readIcons } from './validate.mjs';

export async function checkIcons(directory = root) {
  const { icons, findings } = await readIcons(directory);
  const registry = path.join(directory, 'src/generated/icons.ts');
  if (!(await exists(registry)) || (await readFile(registry, 'utf8')) !== projectIcons(icons))
    findings.push({
      code: 'icon-registry-drift',
      icon: 'src/generated/icons.ts',
      message: 'The typed icon registry does not match the SVG sources',
    });
  return { icons, checked: icons.size, findings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { checked, findings } = await checkIcons(root);
    console.log(
      JSON.stringify({ status: findings.length ? 'failed' : 'passed', checked, findings }, null, 2),
    );
    if (findings.length) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
