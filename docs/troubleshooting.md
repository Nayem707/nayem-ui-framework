# Troubleshooting

Solutions to common issues when installing, configuring, or using Lumynar UI.

---

## Installation

### Peer dependency warnings

**Symptom:** npm warns about incompatible React versions.

**Solution:**

```bash
npm install lumynar-ui --legacy-peer-deps
```

This is safe when your React version is 16.8 or higher.

---

### Cannot publish duplicate version

**Symptom:** `403 Forbidden — You cannot publish over the previously published versions`.

**Cause:** The version in `package.json` already exists on npm.

**Solution:** Bump the version before publishing:

```bash
npm version patch   # or minor / major
npm publish
```

See [Publishing](./publishing.md) for the full release workflow.

---

## Styling

### Components render without styles

**Symptom:** Buttons, inputs, and cards appear as unstyled HTML elements.

**Cause:** Tailwind CSS is not configured to scan the package output.

**Solution:**

1. Add the package to Tailwind content paths:

```js
// tailwind.config.js
content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './node_modules/lumynar-ui/dist/**/*.{js,jsx}',
],
```

2. Ensure global CSS includes Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart your dev server.

---

### Custom `className` not applying on Button

**Symptom:** Passing `className` to `Button` removes default styling entirely.

**Cause:** By design, when `className` is provided, default variant/size classes are skipped.

**Solution:** Include all styling in your `className`:

```jsx
<Button className="bg-blue-500 text-white px-4 py-2 rounded">
  Custom
</Button>
```

Or omit `className` and use `variant` + `size` props instead.

---

## Imports

### Module not found

**Symptom:** `Cannot find module 'lumynar-ui'`

**Solution:**

```bash
npm install lumynar-ui
```

Verify the package appears in `node_modules/lumynar-ui/dist/`.

---

### Importing from internal paths

**Symptom:** Build errors when importing from `lumynar-ui/src/...`

**Cause:** Internal paths are not part of the public API.

**Solution:** Always import from the package root:

```jsx
// Correct
import { Button } from 'lumynar-ui';

// Incorrect
import Button from 'lumynar-ui/src/components/ui/buttons/Buttons';
```

---

## Components

### Alert does not show with `variant` prop

**Symptom:** `<Alert variant="success">` does not apply styles.

**Cause:** `Alert` uses `type`, not `variant`.

**Solution:**

```jsx
<Alert type="success" message="Done!" />
```

---

### Toast does not auto-close

**Symptom:** Toast stays visible indefinitely.

**Cause:** `onClose` is required for auto-close behavior. `duration` defaults to `5000` ms.

**Solution:**

```jsx
<Toast
  message="Saved!"
  onClose={() => setShowToast(false)}
  duration={3000}
/>
```

Set `duration={0}` to disable auto-close.

---

### Checkbox label not clickable

**Symptom:** Clicking the label does not toggle the checkbox.

**Cause:** The `id` prop must match between `Checkbox` and its label.

**Solution:**

```jsx
<Checkbox id="terms" label="Accept terms" />
```

---

## Development

### Tests fail after adding a component

**Checklist:**

1. Create a co-located `*.test.jsx` file
2. Run `npm test` to see specific failures
3. Ensure coverage stays above 90%: `npm run test:coverage`

---

### Build fails with JSX errors

**Solution:**

```bash
npm run build
```

Ensure all `.jsx` files use valid JSX syntax. The build uses Babel with `@babel/preset-react`.

---

## FAQ

### Does Lumynar UI work without Tailwind?

No. Components render Tailwind utility classes. Without Tailwind configured in your app, components will be unstyled. A standalone CSS build is planned for v1.0.

### Does it support React 15?

No. Despite the peer dependency range, components require React 16.8+ due to hooks usage.

### Is TypeScript supported?

Not yet. TypeScript definitions are planned for v0.2. See [Compatibility](./compatibility.md) for a temporary module declaration workaround.

### Can I use components in Next.js?

Yes. Install Lumynar UI, configure Tailwind, and import components in client components (`'use client'`). Server Components support is on the roadmap.

### How do I report a bug?

1. Search [existing issues](https://github.com/Nayem707/nayem-ui-framework/issues)
2. Open a [new issue](https://github.com/Nayem707/nayem-ui-framework/issues/new) with reproduction steps

---

## Related documents

- [Getting Started](./getting-started.md)
- [Compatibility](./compatibility.md)
- [Components](./components.md)
- [Publishing](./publishing.md)
