import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default padding and shadow classes', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild.className).toContain('p-6');
    expect(container.firstChild.className).toContain('shadow-md');
  });

  it.each(['none', 'sm', 'md', 'lg'])('applies %s padding', (padding) => {
    const { container } = render(<Card padding={padding}>Content</Card>);
    const expected = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
    if (expected[padding]) {
      expect(container.firstChild.className).toContain(expected[padding]);
    }
  });

  it.each(['none', 'sm', 'md', 'lg'])('applies %s shadow', (shadow) => {
    const { container } = render(<Card shadow={shadow}>Content</Card>);
    const expected = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };
    if (expected[shadow]) {
      expect(container.firstChild.className).toContain(expected[shadow]);
    }
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    expect(container.firstChild.className).toContain('custom-card');
  });

  it('forwards additional props', () => {
    render(
      <Card data-testid="card" role="region">
        Content
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveAttribute('role', 'region');
  });

  it('renders long children text', () => {
    const longText = 'Content '.repeat(100);
    render(<Card>{longText}</Card>);
    expect(screen.getByText(longText.trim())).toBeInTheDocument();
  });
});
