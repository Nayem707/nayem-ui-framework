import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild.className).toContain('border-t');
  });

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild.className).toContain('border-l');
  });

  it('renders divider with centered text', () => {
    render(<Divider text="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('does not render text span when text is empty', () => {
    render(<Divider text="" />);
    expect(screen.queryByText('OR')).not.toBeInTheDocument();
  });

  it('applies custom className to horizontal divider', () => {
    const { container } = render(<Divider className="custom-divider" />);
    expect(container.firstChild.className).toContain('custom-divider');
  });

  it('applies custom className to text divider', () => {
    const { container } = render(
      <Divider text="Section" className="custom-divider" />,
    );
    expect(container.firstChild.className).toContain('custom-divider');
  });

  it('applies custom className to vertical divider', () => {
    const { container } = render(
      <Divider orientation="vertical" className="custom-divider" />,
    );
    expect(container.firstChild.className).toContain('custom-divider');
  });
});
