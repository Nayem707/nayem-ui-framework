const { defineConfig } = require('vitest/config');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/**/*.test.{js,jsx}',
        'src/**/*.spec.{js,jsx}',
        'src/assets/**',
        'src/index.js',
        'src/components/ui/icons/**',
        'src/components/ui/input/**',
        'src/components/ui/modals/**',
        'src/components/ui/tables/**',
        'src/components/ui/tabs/**',
        'src/components/ui/forms/TextArea.jsx',
        'src/components/ui/forms/TextAreaField.jsx',
        'src/components/ui/forms/SelectField.jsx',
        'src/components/ui/Utilities/Breadcrumb.jsx',
        'src/components/ui/Utilities/Collapse.jsx',
        'src/components/ui/Utilities/Pill.jsx',
        'src/components/ui/Utilities/ScrollToTop.jsx',
        'src/components/ui/Media/Video.jsx',
        'src/components/ui/notifications/useToast.js',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
