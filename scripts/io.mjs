import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
export async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))
      .map(async (entry) => {
        const file = path.join(directory, entry.name);
        if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${file}`);
        return entry.isDirectory() ? filesUnder(file) : [file];
      }),
  );
  return files.flat();
}
export async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}
