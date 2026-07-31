import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders children inside a section', () => {
    render(<Container>Container content</Container>);
    expect(screen.getByText('Container content')).toBeInTheDocument();
    expect(screen.getByText('Container content').closest('section')).toBeInTheDocument();
  });

  it('applies default full size class', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.querySelector('section').className).toContain('max-w-8xl');
  });

  it.each(['default', 'full', 'xl', 'lg', 'sm'])('applies %s size', (size) => {
    const { container } = render(<Container size={size}>Content</Container>);
    const expected = {
      default: 'max-w-4xl',
      full: 'max-w-8xl',
      xl: 'max-w-7xl',
      lg: 'max-w-6xl',
      sm: 'max-w-2xl',
    };
    expect(container.querySelector('section').className).toContain(
      expected[size],
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-container">Content</Container>,
    );
    expect(container.querySelector('section').className).toContain(
      'custom-container',
    );
  });

  it('renders as semantic section element', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
