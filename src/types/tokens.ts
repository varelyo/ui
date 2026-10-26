type VariantMap = { readonly variants: object };
type SizeMap = { readonly sizes: object };
type SlotMap = { readonly slots: object };

type Variants<T extends VariantMap> = T['variants'];

export type VariantOf<T extends VariantMap> = Extract<keyof Variants<T>, string>;

export type ColorOf<T extends VariantMap> = Extract<keyof Variants<T>[keyof Variants<T>], string>;

export type SizeOf<T extends SizeMap> = Extract<keyof T['sizes'], string>;

export type SlotOf<T extends SlotMap> = Extract<keyof T['slots'], string>;
