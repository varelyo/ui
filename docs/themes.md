# Themes

The library ships two brands, `neutral` and `slate`, each with light and dark modes. ThemeScope selects the brand and mode for its subtree, and scopes can be nested. Use the theme-scope playground story to inspect nested scopes and the light/dark output.

Every visual value is a CSS custom property with the `--vy-` prefix, defined in `src/generated/theme.css` and `src/generated/tokens.css`: spacing, radius, typography, elevation, motion and colour roles. Component visual props use the generated token types, so a theme change never needs a component change.

## Customize a theme

Override the variables in your own stylesheet, imported after `theme.css`. The generated variables live in the `theme` cascade layer, so unlayered rules take precedence. Scope an override to a brand with `[data-vy-brand]`. A colour role has a light and a dark value:

```css
[data-vy-brand='neutral'] {
  --vy-color-primary-default--light: #1d4ed8;
  --vy-color-primary-default--dark: #93c5fd;
  --vy-radius-md: 0.5rem;
}
```

`src/generated/colour-roles.md` lists every colour role, its purpose, the contrast it keeps and the component slots that use it. Do not edit files in `src/generated`.
