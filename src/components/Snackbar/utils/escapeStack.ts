const entries: symbol[] = [];

export const escapeStack = {
  push(): symbol {
    const entry = Symbol('snackbar');
    entries.push(entry);
    return entry;
  },
  isTop(entry: symbol): boolean {
    return entries.at(-1) === entry;
  },
  remove(entry: symbol): void {
    const index = entries.indexOf(entry);
    if (index !== -1) entries.splice(index, 1);
  },
};
