type VariantMap = { readonly variants: object };
type SizeMap = { readonly sizes: object };
type SlotMap = { readonly slots: object };

type Variants<T extends VariantMap> = T['variants'];
type Sizes<T extends SizeMap> = T['sizes'];
type IntentSizes<T extends SizeMap> = Sizes<T>[keyof Sizes<T>];

export type VariantOf<T extends VariantMap> = Extract<keyof Variants<T>, string>;

export type ColorOf<T extends VariantMap> = Extract<keyof Variants<T>[keyof Variants<T>], string>;

export type SizeOf<T extends SizeMap> = Extract<keyof IntentSizes<T>[keyof IntentSizes<T>], string>;

export type SlotOf<T extends SlotMap> = Extract<keyof T['slots'], string>;
