# Contributing to Lumynar UI

Thank you for your interest in contributing. This guide covers setup, standards, and the pull request process.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 14+ |
| npm, yarn, pnpm, or bun | Latest stable |
| Git | Any recent version |

---

## Development setup

### 1. Fork and clone

```bash
git clone https://github.com/YOUR_USERNAME/nayem-ui-framework.git
cd nayem-ui-framework
```

### 2. Add upstream remote

```bash
git remote add upstream https://github.com/Nayem707/nayem-ui-framework.git
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development

```bash
npm run dev      # Rollup watch mode
npm run test:watch  # Tests in watch mode
```

---

## How to contribute

### Report a bug

1. Search [existing issues](https://github.com/Nayem707/nayem-ui-framework/issues) for duplicates
2. Open a new issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - React version, Node version, and package manager

### Suggest a feature

1. Check the [roadmap](../README.md#roadmap) and existing issues
2. Open an issue describing the use case and proposed API

### Submit code

1. Create a branch from `main`:

```bash
git checkout -b feat/my-feature
# or
git checkout -b fix/my-bug-fix
```

2. Make your changes following the [coding standards](#coding-standards) below

3. Run checks:

```bash
npm test
npm run test:coverage
npm run build
```

4. Commit using [Conventional Commits](#commit-messages):

```bash
git commit -m "feat: add Tooltip component"
```

5. Push and open a Pull Request:

```bash
git push origin feat/my-feature
```

---

## Coding standards

### Components

| Rule | Detail |
|------|--------|
| Functional components | Use function components with hooks |
| Props | Destructure with defaults; spread `...rest` to the root element |
| Styling | Tailwind utility classes via class maps — not inline `style` defaults |
| `className` | Accept and append to default classes on every component |
| File location | `src/components/ui/{category}/{ComponentName}.jsx` |
| Tests | Co-located `{ComponentName}.test.jsx` beside the component |
| Exports | Add new public components to `src/index.js` |

### Component template

```jsx
import React from 'react';

const MyComponent = ({
  children,
  variant = 'default',
  className = '',
  ...rest
}) => {
  const variants = {
    default: 'bg-white text-gray-900',
    primary: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MyComponent;
```

### File organization

```
src/
├── index.js                    # Public exports only
├── utils/
│   └── reactCompat.js
└── components/ui/
    ├── buttons/
    │   ├── Buttons.jsx
    │   └── Buttons.test.jsx
    ├── forms/
    ├── layouts/
    ├── typography/
    ├── notifications/
    ├── Media/
    └── Utilities/
```

> Only components exported from `src/index.js` are part of the public API.

---

## Testing requirements

All contributions that modify or add components must include tests.

| Requirement | Detail |
|-------------|--------|
| Framework | Vitest + React Testing Library |
| Location | Co-located `*.test.jsx` files |
| Coverage | Must not drop below 90% threshold |
| Style | Test behavior via roles, labels, and visible text |

See [docs/testing.md](./docs/testing.md) for full testing guide.

---

## Pull request process

1. All changes go through a Pull Request
2. PR title follows Conventional Commits format
3. `npm test` and `npm run build` must pass
4. New components require tests and documentation updates in `docs/components.md`
5. Breaking API changes require a major version bump discussion

### PR checklist

- [ ] Tests pass (`npm test`)
- [ ] Coverage threshold met (`npm run test:coverage`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated if APIs changed
- [ ] No imports from internal paths exposed to consumers

---

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New features or components |
| `fix:` | Bug fixes |
| `docs:` | Documentation only |
| `test:` | Adding or updating tests |
| `refactor:` | Code changes without feature/fix |
| `chore:` | Maintenance (deps, CI, config) |

Examples:

```
feat: add Tooltip component with position variants
fix: correct Alert type prop in documentation
test: add edge case tests for Button disabled state
docs: update getting started guide
```

---

## Release process

Maintainers follow [docs/publishing.md](./docs/publishing.md):

1. Ensure all tests pass on `main`
2. Bump version with `npm version patch|minor|major`
3. Publish with `npm publish`
4. Update `latest` dist-tag if needed

---

## Code of conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Provide constructive feedback
- Respect different viewpoints and experiences

---

## Questions?

1. Read the [documentation](./docs/README.md)
2. Search [existing issues](https://github.com/Nayem707/nayem-ui-framework/issues)
3. Open a new issue with the `question` label

---

## Recognition

Contributors are acknowledged in release notes and the project README.

Thank you for helping improve Lumynar UI.
