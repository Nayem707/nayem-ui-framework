import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.png" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('renders fallback initial when src is absent', () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders default initial U when alt is absent', () => {
    render(<Avatar />);
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg', 'xl'])('applies %s size for image avatar', (size) => {
    render(<Avatar src="/avatar.png" alt="User" size={size} />);
    const expected = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };
    expect(screen.getByRole('img').className).toContain(expected[size]);
  });

  it.each(['sm', 'md', 'lg', 'xl'])(
    'applies %s size for fallback avatar',
    (size) => {
      const { container } = render(<Avatar alt="User" size={size} />);
      const expected = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
      };
      expect(container.firstChild.className).toContain(expected[size]);
    },
  );

  it('applies custom className to image avatar', () => {
    render(
      <Avatar src="/avatar.png" alt="User" className="custom-avatar" />,
    );
    expect(screen.getByRole('img').className).toContain('custom-avatar');
  });

  it('applies custom className to fallback avatar', () => {
    const { container } = render(
      <Avatar alt="User" className="custom-avatar" />,
    );
    expect(container.firstChild.className).toContain('custom-avatar');
  });

  it('uppercases fallback initial', () => {
    render(<Avatar alt="alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
