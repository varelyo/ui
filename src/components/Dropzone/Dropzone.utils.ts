import type { ReactNode } from 'react';
import {
  DROPZONE_ACCEPT_SEPARATOR,
  DROPZONE_EXTENSION_PREFIX,
  DROPZONE_FILE_INPUT_SELECTOR,
  DROPZONE_ITEM_KIND,
  DROPZONE_TRANSFER_TYPE,
  DROPZONE_WILDCARD_SUFFIX,
} from './Dropzone.constants';
import type {
  DropzoneDragVerdict,
  DropzoneFilePartition,
  DropzoneFileRules,
  FileRejection,
  FileRejectionReason,
} from './Dropzone.types';

export const present = (node: ReactNode) => node !== undefined && node !== null && node !== false;

export const carriesFiles = (transfer: DataTransfer | null) =>
  transfer?.types.includes(DROPZONE_TRANSFER_TYPE) ?? false;

export const takesDroppedFiles = (target: EventTarget | null) =>
  target instanceof Element && target.matches(DROPZONE_FILE_INPUT_SELECTOR);

const acceptTokens = (accept: string | undefined) =>
  (accept ?? '')
    .split(DROPZONE_ACCEPT_SEPARATOR)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

const extensionToken = (token: string) => token.startsWith(DROPZONE_EXTENSION_PREFIX);

const matchesType = (type: string, token: string) =>
  token.endsWith(DROPZONE_WILDCARD_SUFFIX) ? type.startsWith(token.slice(0, -1)) : type === token;

export function acceptsFile(file: File, accept: string | undefined): boolean {
  const tokens = acceptTokens(accept);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    tokens.length === 0 ||
    tokens.some((token) =>
      extensionToken(token) ? name.endsWith(token) : matchesType(type, token),
    )
  );
}

export const fileLimit = ({ multiple, maxFiles }: DropzoneFileRules) =>
  multiple ? (maxFiles ?? Number.POSITIVE_INFINITY) : 1;

const reasonsOf = (file: File, rules: DropzoneFileRules): FileRejectionReason[] => {
  const reasons: FileRejectionReason[] = [];
  if (!acceptsFile(file, rules.accept)) reasons.push('type');
  if (rules.maxSize !== undefined && file.size > rules.maxSize) reasons.push('size');
  return reasons;
};

export function partitionFiles(
  files: readonly File[],
  rules: DropzoneFileRules,
): DropzoneFilePartition {
  const checked = files.map((file) => ({ file, reasons: reasonsOf(file, rules) }));
  const valid = checked.filter((entry) => entry.reasons.length === 0);
  const overflow = valid.length > fileLimit(rules);
  const rejected: FileRejection[] = [];
  for (const { file, reasons } of checked)
    if (reasons.length) rejected.push({ file, reasons });
    else if (overflow) rejected.push({ file, reasons: ['count'] });
  return { accepted: overflow ? [] : valid.map((entry) => entry.file), rejected };
}

export function dragVerdict(
  transfer: DataTransfer | null,
  rules: DropzoneFileRules,
): DropzoneDragVerdict | undefined {
  if (!transfer || !carriesFiles(transfer)) return undefined;
  const items = Array.from(transfer.items).filter((item) => item.kind === DROPZONE_ITEM_KIND);
  if (items.length > fileLimit(rules)) return 'reject';
  const tokens = acceptTokens(rules.accept);
  const typesOnly = tokens.length > 0 && !tokens.some(extensionToken);
  const refused =
    typesOnly &&
    items.some(
      (item) =>
        item.type !== '' && !tokens.some((token) => matchesType(item.type.toLowerCase(), token)),
    );
  return refused ? 'reject' : 'accept';
}
