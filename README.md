<div align="center">
  <img src="./src/assets/header.svg" alt="Lumynar UI" width="100%" />
</div>

# Lumynar UI

[![npm version](https://badge.fury.io/js/lumynar-ui.svg)](https://www.npmjs.com/package/lumynar-ui)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-16.8%2B%20%E2%80%93%2019%2B-blue.svg)](https://react.dev/)

A lightweight React component library with a small, focused API. Components are built with utility-class styling and designed to be customized through props, `className`, and inline styles.

**Package:** [`lumynar-ui`](https://www.npmjs.com/package/lumynar-ui) · **Repository:** [`nayem-ui-framework`](https://github.com/Nayem707/nayem-ui-framework)

> **Documentation Website** — Coming Soon  
> **Live Playground** — Coming Soon  
> **Storybook** — Coming Soon

---

## Why Lumynar UI

Lumynar UI is for developers who want a **small set of ready-made React components** without adopting a large design system or heavy runtime.

**Problems it addresses:**

- You need common UI primitives (buttons, inputs, cards, alerts) without writing them from scratch.
- You already use Tailwind CSS and want components that compose with your existing utility classes.
- You prefer a library with **no runtime npm dependencies** beyond React itself.

**What makes it different:**

- **Minimal surface area** — 19 exported components, no sprawling component tree.
- **Customization-first** — every component accepts `className` and most accept `style`.
- **Small bundle footprint** — source is compiled to CJS and ESM; React is a peer dependency.

Lumynar UI is early-stage (v0.0.x). It is best suited for side projects, prototypes, and teams comfortable contributing fixes upstream.

---

## Features

- 19 exported components across forms, layout, typography, feedback, and media
- Dual build output (CommonJS + ESM)
- React and React DOM as the only peer dependencies
- `className` and `style` props for styling overrides
- Tailwind CSS utility classes baked into component markup
- Rollup-based build with Babel JSX transform

---

## Installation

```bash
npm install lumynar-ui
```

```bash
yarn add lumynar-ui
```

```bash
pnpm add lumynar-ui
```

```bash
bun add lumynar-ui
```

---

## Requirements

| Requirement | Version | Notes |
|-------------|---------|-------|
| **React** | 16.8+ recommended | Components use hooks (`useState`, `useEffect`). React 15 is listed as a peer dependency but is not tested or supported in practice. |
| **React DOM** | Matching React version | Required peer dependency. |
| **Tailwind CSS** | v3+ recommended | **Required in your app.** Components use Tailwind utility classes. Lumynar UI does not ship a standalone CSS file. |
| **Node.js** | 14+ | For local development and building from source. |

### Tailwind setup

Add Lumynar UI to your Tailwind `content` paths so utility classes are included in your build:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/lumynar-ui/dist/**/*.{js,jsx}',
  ],
  // ...
};
```

### Peer dependency warnings

If your package manager reports peer dependency conflicts:

```bash
npm install lumynar-ui --legacy-peer-deps
```

---

## Quick Start

```jsx
import React from 'react';
import { Button, InputField, Card, Container, Alert } from 'lumynar-ui';

function App() {
  return (
    <Container>
      <Card>
        <h1>Welcome to Lumynar UI</h1>
        <InputField placeholder="Enter your name…" />
        <Button onClick={() => alert('Hello!')}>Click me</Button>
        <Alert type="success" message="Components are working." />
      </Card>
    </Container>
  );
}

export default App;
```

---

## Component Overview

All components below are exported from the package entry point.

| Category | Components | Description |
|----------|------------|-------------|
| **Buttons** | `Button` | Button with `variant` (`primary`, `secondary`, `danger`) and `size` (`sm`, `md`, `lg`) |
| **Forms** | `InputField`, `Label`, `Checkbox`, `FormWrapper` | Text input, label, checkbox, and form container |
| **Layout** | `Card`, `Container`, `Grid`, `Row`, `Column` | Card, responsive container, and grid/row/column helpers |
| **Typography** | `Heading`, `Paragraph` | Semantic heading (`level` 1–6) and paragraph text |
| **Feedback** | `Alert`, `Toast`, `Badge`, `Loading`, `Skeleton` | Alerts, toasts, badges, spinners, and skeleton placeholders |
| **Media** | `Avatar`, `Image` | Profile avatar and enhanced image |
| **Utilities** | `Divider` | Horizontal or vertical content separator |

### Example

```jsx
import { Button, InputField, Card, Container, Alert, Badge } from 'lumynar-ui';

function ContactForm() {
  return (
    <Container>
      <Card>
        <Badge variant="success">New</Badge>
        <h2>Contact</h2>
        <InputField placeholder="Email" type="email" />
        <Button variant="primary" size="lg">Subscribe</Button>
        <Alert type="info" message="We'll never share your email." />
      </Card>
    </Container>
  );
}
```

---

## Customization

### `className`

Pass Tailwind or custom classes to override or extend default styles.

```jsx
<Button className="bg-purple-600 hover:bg-purple-700 rounded-full">
  Custom Button
</Button>
```

When `className` is provided on `Button`, default variant/size classes are not applied — you control styling entirely.

### `style`

Pass inline styles for one-off overrides.

```jsx
<Button
  variant="primary"
  style={{ backgroundColor: '#ff6b6b', padding: '15px 30px' }}
>
  Inline Styled
</Button>
```

### Tailwind integration

Components are authored with Tailwind utility classes. The recommended approach is to configure Tailwind in your project (see [Requirements](#requirements)) and use `className` to align components with your design tokens.

---

## Accessibility

Accessibility support is **limited** in the current release. Components do not yet include comprehensive ARIA attributes, focus management, or keyboard interaction patterns.

| Area | Status |
|------|--------|
| Modal focus trapping | Not implemented |
| Toast live regions (`role="alert"`) | Not implemented |
| Form error associations (`aria-describedby`) | Partial — `Label` supports `htmlFor` |
| Keyboard navigation for interactive widgets | Not implemented |

Enhanced accessibility is planned for a future release. If accessibility is critical for your project, audit components before use or contribute improvements via [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## React Compatibility

| React version | Support level | Notes |
|---------------|---------------|-------|
| **19.x** | Supported | Tested target |
| **18.x** | Supported | Tested target |
| **17.x** | Supported | Should work |
| **16.8 – 16.x** | Supported | Minimum practical version (hooks required) |
| **16.0 – 16.7** | Not supported | Components rely on hooks |
| **15.x** | Not supported | Listed in peer deps but not compatible with current source |

The package ships as compiled JS (CJS + ESM) with React externalized. A compatibility utility layer exists in source but is not actively used by individual components.

---

## Development

### Prerequisites

- Node.js 14+
- npm, yarn, pnpm, or bun

### Setup

```bash
git clone https://github.com/Nayem707/nayem-ui-framework.git
cd nayem-ui-framework
npm install
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch mode (Rollup) |
| `npm run build` | Production build to `dist/` |

### Project structure

```
lumynar-ui/
├── src/
│   ├── components/ui/   # Component source
│   ├── utils/           # Shared utilities
│   └── index.js         # Public exports
├── dist/                # Build output (generated)
├── rollup.config.js
└── package.json
```

---

## Roadmap

### v0.1

- [ ] Fix known issues in unreleased components (modals, tables, tabs)
- [ ] Align documentation with component APIs
- [ ] Export audit — stabilize public API surface
- [ ] Basic unit tests for exported components

### v0.2

- [ ] TypeScript definitions (`.d.ts`)
- [ ] Storybook documentation
- [ ] Shared design tokens / theme configuration
- [ ] `exports` field for improved tree-shaking

### v1.0

- [ ] Comprehensive test suite
- [ ] Enhanced accessibility (ARIA, focus management, keyboard support)
- [ ] Dark mode support
- [ ] Optional standalone CSS build for non-Tailwind users
- [ ] Documentation website and live playground

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## License

This project is licensed under the [ISC License](./LICENSE).

---

## Author

**Nayem Islam**

| | |
|---|---|
| GitHub | [@Nayem707](https://github.com/Nayem707) |
| npm | [nayemislam](https://www.npmjs.com/~nayemislam) |
| Portfolio | [nayem-490.vercel.app](https://nayem-490.vercel.app) |
| Email | [inaeem707@gmail.com](mailto:inaeem707@gmail.com) |

---

## Support

1. Read this README and [docs/](./docs/)
2. Search [existing issues](https://github.com/Nayem707/nayem-ui-framework/issues)
3. Open a [new issue](https://github.com/Nayem707/nayem-ui-framework/issues/new) if needed

---

<div align="center">
  Made with care by <a href="https://github.com/Nayem707">Nayem Islam</a>
</div>
