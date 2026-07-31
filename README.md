<div align="center">
  <img src="./src/assets/header.svg" alt="Lumynar UI" width="100%" />
</div>

[![npm version](https://badge.fury.io/js/lumynar-ui.svg)](https://www.npmjs.com/package/lumynar-ui)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-16.8%2B%20%E2%80%93%2019%2B-blue.svg)](https://react.dev/)

A lightweight React component library with 19 exported components, Tailwind-based styling, and no runtime npm dependencies beyond React.

|                   |                                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| **npm package**   | [`lumynar-ui`](https://www.npmjs.com/package/lumynar-ui)               |
| **Repository**    | [`nayem-ui-framework`](https://github.com/Nayem707/nayem-ui-framework) |
| **Documentation** | [docs/README.md](./docs/README.md)                                     |

> Documentation website, live playground, and Storybook — **Coming Soon**

---

## Quick Start

```bash
npm install lumynar-ui
```

```jsx
import { Button, InputField, Card, Container, Alert } from 'lumynar-ui';

function App() {
  return (
    <Container>
      <Card>
        <InputField placeholder='Enter your name…' />
        <Button onClick={() => alert('Hello!')}>Click me</Button>
        <Alert type='success' message='Components are working.' />
      </Card>
    </Container>
  );
}
```

> **Requirement:** Tailwind CSS must be configured in your app. See [Getting Started](./docs/getting-started.md).

---

## Documentation

| Guide                                        | Description                                       |
| -------------------------------------------- | ------------------------------------------------- |
| [Getting Started](./docs/getting-started.md) | Installation, Tailwind setup, first component     |
| [Architecture](./docs/architecture.md)       | Project structure, build pipeline, module design  |
| [Components](./docs/components.md)           | Full API reference for all 19 exported components |
| [Customization](./docs/customization.md)     | `className`, `style`, and Tailwind integration    |
| [Compatibility](./docs/compatibility.md)     | Supported React versions and peer dependencies    |
| [Testing](./docs/testing.md)                 | Running tests, coverage, and testing philosophy   |
| [Troubleshooting](./docs/troubleshooting.md) | Common issues and solutions                       |
| [Contributing](./CONTRIBUTING.md)            | Development setup and contribution guidelines     |
| [Publishing](./docs/publishing.md)           | Local linking and npm release workflow            |

---

## Features

- 19 exported components — forms, layout, typography, feedback, media
- Dual build output — CommonJS (`dist/index.cjs.js`) and ESM (`dist/index.esm.js`)
- Zero runtime dependencies — React and React DOM are peer dependencies only
- Customization-first — `className` and `style` on every component
- Tested — 213+ unit tests with 90%+ coverage threshold

---

## Component Overview

| Category   | Components                                       |
| ---------- | ------------------------------------------------ |
| Buttons    | `Button`                                         |
| Forms      | `InputField`, `Label`, `Checkbox`, `FormWrapper` |
| Layout     | `Card`, `Container`, `Grid`, `Row`, `Column`     |
| Typography | `Heading`, `Paragraph`                           |
| Feedback   | `Alert`, `Toast`, `Badge`, `Loading`, `Skeleton` |
| Media      | `Avatar`, `Image`                                |
| Utilities  | `Divider`                                        |

See the [Components reference](./docs/components.md) for props, variants, and examples.

---

## Scripts

| Command                 | Description                 |
| ----------------------- | --------------------------- |
| `npm run build`         | Production build to `dist/` |
| `npm run dev`           | Rollup watch mode           |
| `npm test`              | Run all tests               |
| `npm run test:coverage` | Tests with coverage report  |

---

## Roadmap

| Version | Status      | Highlights                                       |
| ------- | ----------- | ------------------------------------------------ |
| v0.1    | In progress | Export audit, unreleased component fixes         |
| v0.2    | Planned     | TypeScript definitions, Storybook, design tokens |
| v1.0    | Planned     | Enhanced accessibility, dark mode, docs website  |

---

## License

[ISC License](./LICENSE)

---

## Author

**Nayem Islam** — [@Nayem707](https://github.com/Nayem707) · [npm](https://www.npmjs.com/~nayemislam) · [inaeem707@gmail.com](mailto:inaeem707@gmail.com)

---

<div align="center">
  Made with care by <a href="https://github.com/Nayem707">Nayem Islam</a>
</div>
