import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders default text skeleton', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).toContain('h-4');
  });

  it('renders circle skeleton', () => {
    const { container } = render(<Skeleton type="circle" />);
    expect(container.firstChild.className).toContain('rounded-full');
  });

  it('renders rectangle skeleton', () => {
    const { container } = render(<Skeleton type="rectangle" />);
    const skeleton = container.firstChild;
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).not.toContain('h-4');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />);
    expect(container.firstChild.className).toContain('custom-skeleton');
  });

  it('falls back to text skeleton for unknown type', () => {
    const { container } = render(<Skeleton type="unknown" />);
    expect(container.firstChild.className).toContain('h-4');
  });
});
