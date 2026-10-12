# Installation

Clone `https://github.com/varelyo/ui.git` and copy its source into your React 19 application as `vendor/varelyo`, excluding `.git`, `node_modules` and build output. Keep its LICENSE.

Install the exact runtime dependencies from its package.json in your application, and install its Tailwind CSS v4 and Vite plugin versions as development dependencies. Add `@tailwindcss/vite` to your Vite plugins alongside the React plugin. Set `resolve.dedupe` to `["react", "react-dom"]` so copied sources share your application React runtime.

Import `./vendor/varelyo/src/theme.css` once from your application entry. Import components from `./vendor/varelyo/src`. Wrap the application in ThemeScope. Adjust relative paths to match your application layout.

```tsx
import { Button, ThemeScope } from './vendor/varelyo/src';
import './vendor/varelyo/src/theme.css';

export function App() {
  return (
    <ThemeScope>
      <Button>Continue</Button>
    </ThemeScope>
  );
}
```

To customize the theme, override its CSS variables in your own stylesheet as [themes](themes.md) describes. Do not edit the copied `src/generated` files.
