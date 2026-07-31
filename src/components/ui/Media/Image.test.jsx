import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Image from './Image';

describe('Image', () => {
  it('renders image with src and alt', () => {
    render(<Image src="/photo.jpg" alt="Landscape" />);
    const img = screen.getByRole('img', { name: 'Landscape' });
    expect(img).toHaveAttribute('src', '/photo.jpg');
  });

  it('renders with empty alt by default', () => {
    const { container } = render(<Image src="/photo.jpg" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('applies default rounded and hover zoom classes', () => {
    render(<Image src="/photo.jpg" alt="Photo" />);
    const img = screen.getByRole('img');
    expect(img.className).toContain('rounded-lg');
    expect(img.className).toContain('hover:scale-105');
  });

  it('omits hover zoom when hoverZoom is false', () => {
    render(<Image src="/photo.jpg" alt="Photo" hoverZoom={false} />);
    expect(screen.getByRole('img').className).not.toContain('hover:scale-105');
  });

  it('applies custom rounded value', () => {
    render(<Image src="/photo.jpg" alt="Photo" rounded="full" />);
    expect(screen.getByRole('img').className).toContain('rounded-full');
  });

  it('applies objectFit class', () => {
    render(<Image src="/photo.jpg" alt="Photo" objectFit="cover" />);
    expect(screen.getByRole('img').className).toContain('object-cover');
  });

  it('applies numeric width and height as inline styles', () => {
    render(<Image src="/photo.jpg" alt="Photo" width={200} height={100} />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('applies string width and height as inline styles', () => {
    render(
      <Image src="/photo.jpg" alt="Photo" width="100%" height="auto" />,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ width: '100%', height: 'auto' });
  });

  it('applies custom className', () => {
    render(
      <Image src="/photo.jpg" alt="Photo" className="custom-image" />,
    );
    expect(screen.getByRole('img').className).toContain('custom-image');
  });

  it('omits rounded class when rounded is falsy', () => {
    render(<Image src="/photo.jpg" alt="Photo" rounded="" />);
    expect(screen.getByRole('img').className).not.toContain('rounded-lg');
  });
});
