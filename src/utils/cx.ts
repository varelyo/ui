import { extendTailwindMerge } from 'tailwind-merge';
import { mergeConfig } from '../generated/merge';

type KitClassGroup = Extract<keyof typeof mergeConfig.extend.classGroups, string>;

const merge = extendTailwindMerge<KitClassGroup>(mergeConfig);

export type ClassValue = string | false | null | undefined;

export function cx(...values: readonly ClassValue[]): string {
  return merge(values.filter(Boolean).join(' '));
}
