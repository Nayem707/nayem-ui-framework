import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders a spinner element', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('applies default md size', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.animate-spin').className).toContain(
      'w-8 h-8',
    );
  });

  it.each(['sm', 'md', 'lg'])('applies %s size', (size) => {
    const { container } = render(<Loading size={size} />);
    const expected = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
    expect(container.querySelector('.animate-spin').className).toContain(
      expected[size],
    );
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(<Loading className="custom-loading" />);
    expect(container.firstChild.className).toContain('custom-loading');
  });

  it('centers spinner in flex container', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild.className).toContain('flex');
    expect(container.firstChild.className).toContain('items-center');
    expect(container.firstChild.className).toContain('justify-center');
  });
});
