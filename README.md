# Varelyo Foundation

Open-source React UI components built for developers and AI agents.

A reusable component library with typed APIs, design tokens, and a consistent architecture. Use the components in your own projects, customize them freely, and build your own design system.

**Open Source. Open Code. Your Components.**

## Features

- **Source-owned components** — Keep the React and TypeScript code in your project.
- **Typed APIs** — Explicit props, variants, sizes, and component states.
- **Design tokens** — Core, Semantic, and Component token layers.
- **Consistent architecture** — Predictable patterns for customization and extension.
- **AI-ready** — Designed to help agents understand, reuse, and extend components.

## Installation

Clone the source repository:

```sh
git clone https://github.com/varelyo/ui.git
cd ui
pnpm install --frozen-lockfile --ignore-scripts
```

Use Node 24.11.1 and pnpm 10.25.0. See [installation](docs/installation.md) to use the source in your application.

## Documentation

Explore components, interactive examples, and TypeScript API references.

[Documentation](https://varelyo.com/foundation) · [Components](https://varelyo.com/foundation/components)

Local guides: [themes](docs/themes.md) · [components](docs/components.md).

## Build with AI

Varelyo uses Foundation to create product interfaces with reusable components and a design system that evolves alongside your application.

[Explore Varelyo](https://varelyo.com)

## Develop

```sh
pnpm exec playwright install chromium
pnpm playground
```

Run icons:check, typecheck, lint, test, build and format:check before submitting changes. Visual baselines are platform-specific; run visual:verify when appearance changes, and maintainers review every baseline change.

Theme files in `src/generated` are prebuilt; customize a theme by overriding its CSS variables as [themes](docs/themes.md) describes.

## License

[MIT](LICENSE), copyright Cristian Vacarciuc. Installed dependencies retain their own licenses.
