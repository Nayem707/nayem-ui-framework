import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default primary variant and md size', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-blue-100');
    expect(badge.className).toContain('text-sm');
  });

  it.each(['primary', 'secondary', 'success', 'danger', 'warning'])(
    'applies %s variant',
    (variant) => {
      render(<Badge variant={variant}>Badge</Badge>);
      const expected = {
        primary: 'bg-blue-100',
        secondary: 'bg-gray-100',
        success: 'bg-green-100',
        danger: 'bg-red-100',
        warning: 'bg-yellow-100',
      };
      expect(screen.getByText('Badge').className).toContain(expected[variant]);
    },
  );

  it.each(['sm', 'md', 'lg'])('applies %s size', (size) => {
    render(<Badge size={size}>Badge</Badge>);
    const expected = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
    expect(screen.getByText('Badge').className).toContain(expected[size]);
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Badge</Badge>);
    expect(screen.getByText('Badge').className).toContain('custom-badge');
  });

  it('forwards additional props', () => {
    render(
      <Badge data-testid="badge" aria-label="Status badge">
        Active
      </Badge>,
    );
    expect(screen.getByTestId('badge')).toHaveAttribute(
      'aria-label',
      'Status badge',
    );
  });

  it('renders long children text', () => {
    const longText = 'Status '.repeat(20);
    render(<Badge>{longText}</Badge>);
    expect(screen.getByText(longText.trim())).toBeInTheDocument();
  });
});
