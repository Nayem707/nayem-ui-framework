import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Column from './Column';

describe('Column', () => {
  it('renders children', () => {
    render(<Column>Column content</Column>);
    expect(screen.getByText('Column content')).toBeInTheDocument();
  });

  it('applies default col-span class', () => {
    const { container } = render(<Column>Content</Column>);
    expect(container.firstChild.className).toContain('col-span-1');
  });

  it('applies custom span', () => {
    const { container } = render(<Column span={3}>Content</Column>);
    expect(container.firstChild.className).toContain('col-span-3');
  });

  it('applies flex-1 when grow is true', () => {
    const { container } = render(<Column grow>Content</Column>);
    expect(container.firstChild.className).toContain('flex-1');
    expect(container.firstChild.className).not.toContain('col-span');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Column className="custom-column">Content</Column>,
    );
    expect(container.firstChild.className).toContain('custom-column');
  });
});
