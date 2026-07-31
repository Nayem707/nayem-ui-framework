import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <span>Item 1</span>
        <span>Item 2</span>
      </Grid>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies default grid classes', () => {
    const { container } = render(<Grid>Content</Grid>);
    expect(container.firstChild.className).toContain('grid');
    expect(container.firstChild.className).toContain('gap-4');
  });

  it.each([1, 2, 3, 4, 5, 6])('applies column config for cols=%i', (cols) => {
    const { container } = render(<Grid cols={cols}>Content</Grid>);
    expect(container.firstChild.className).toContain('grid-cols');
  });

  it.each(['none', 'sm', 'md', 'lg', 'xl'])('applies %s gap', (gap) => {
    const { container } = render(<Grid gap={gap}>Content</Grid>);
    const expected = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };
    expect(container.firstChild.className).toContain(expected[gap]);
  });

  it('falls back to default cols when invalid cols provided', () => {
    const { container } = render(<Grid cols={99}>Content</Grid>);
    expect(container.firstChild.className).toContain('md:grid-cols-2');
  });

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom-grid">Content</Grid>);
    expect(container.firstChild.className).toContain('custom-grid');
  });
});
