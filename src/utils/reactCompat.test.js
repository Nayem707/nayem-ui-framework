import { describe, it, expect, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  isReact18Plus,
  isReact17Plus,
  isReactHooksSupported,
  SafeFragment,
  safeForwardRef,
  safeMemo,
  safeLazy,
  ensureReactCompat,
} from './reactCompat';

describe('reactCompat', () => {
  describe('version detection', () => {
    it('isReactHooksSupported returns true in test environment', () => {
      expect(isReactHooksSupported()).toBe(true);
    });

    it('isReact17Plus returns boolean based on React version', () => {
      expect(typeof isReact17Plus()).toBe('boolean');
    });

    it('isReact18Plus returns boolean based on React version', () => {
      expect(typeof isReact18Plus()).toBe('boolean');
    });
  });

  describe('SafeFragment', () => {
    it('is defined', () => {
      expect(SafeFragment).toBeTruthy();
    });
  });

  describe('safeForwardRef', () => {
    it('returns a forwardRef component when supported', () => {
      const Component = (props, ref) =>
        React.createElement('span', { ref, ...props });
      const result = safeForwardRef(Component);
      expect(result).toBeTruthy();
      expect(result).not.toBe(Component);
    });

    it('returns component as-is when forwardRef unavailable', () => {
      const original = React.forwardRef;
      React.forwardRef = undefined;
      const Component = () => null;
      expect(safeForwardRef(Component)).toBe(Component);
      React.forwardRef = original;
    });
  });

  describe('safeMemo', () => {
    it('returns memoized component when supported', () => {
      const Component = () => React.createElement('div', null, 'Memo');
      const result = safeMemo(Component);
      expect(result).toBeTruthy();
      expect(result).not.toBe(Component);
    });

    it('returns component as-is when memo unavailable', () => {
      const original = React.memo;
      React.memo = undefined;
      const Component = () => null;
      expect(safeMemo(Component)).toBe(Component);
      React.memo = original;
    });
  });

  describe('safeLazy', () => {
    it('returns lazy component when supported', () => {
      const importFunc = () =>
        Promise.resolve({ default: () => React.createElement('div') });
      const result = safeLazy(importFunc);
      expect(result).toBeTruthy();
    });

    it('loads component via fallback when lazy is unavailable', async () => {
      const original = React.lazy;
      React.lazy = undefined;
      const LazyComponent = () => React.createElement('div', null, 'Loaded');
      const importFunc = vi.fn(() =>
        Promise.resolve({ default: LazyComponent }),
      );
      const FallbackLazy = safeLazy(importFunc);
      render(React.createElement(FallbackLazy));
      await waitFor(() => {
        expect(screen.getByText('Loaded')).toBeInTheDocument();
      });
      expect(importFunc).toHaveBeenCalled();
      React.lazy = original;
    });

    it('resolves module export when default export is missing', async () => {
      const original = React.lazy;
      React.lazy = undefined;
      const LazyComponent = () => React.createElement('span', null, 'Module');
      const importFunc = vi.fn(() => Promise.resolve(LazyComponent));
      const FallbackLazy = safeLazy(importFunc);
      render(React.createElement(FallbackLazy));
      await waitFor(() => {
        expect(screen.getByText('Module')).toBeInTheDocument();
      });
      React.lazy = original;
    });
  });

  describe('ensureReactCompat', () => {
    const originalFragment = React.Fragment;
    const originalCreateContext = React.createContext;

    afterEach(() => {
      React.Fragment = originalFragment;
      React.createContext = originalCreateContext;
    });

    it('does not throw when called', () => {
      expect(() => ensureReactCompat()).not.toThrow();
    });

    it('polyfills Fragment when missing', () => {
      React.Fragment = undefined;
      ensureReactCompat();
      expect(React.Fragment).toBeDefined();
    });

    it('polyfills createContext when missing', () => {
      React.createContext = undefined;
      ensureReactCompat();
      expect(React.createContext).toBeTypeOf('function');
      const ctx = React.createContext('default');
      expect(ctx.Provider).toBeTypeOf('function');
      expect(ctx.Consumer).toBeTypeOf('function');
    });

    it('polyfilled createContext Provider and Consumer render children', () => {
      React.createContext = undefined;
      ensureReactCompat();
      const ctx = React.createContext('fallback');
      const Child = () => React.createElement('span', null, 'child');
      const { container: providerContainer } = render(
        React.createElement(ctx.Provider, { value: 'provided' }, Child()),
      );
      expect(providerContainer.textContent).toContain('child');

      const consumerChild = (value) =>
        React.createElement('span', null, `value:${value}`);
      const { container: consumerContainer } = render(
        React.createElement(ctx.Consumer, null, consumerChild),
      );
      expect(consumerContainer.textContent).toBe('value:fallback');
    });
  });
});
