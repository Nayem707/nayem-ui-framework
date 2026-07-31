import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading', () => {
  it('renders as h1 by default', () => {
    render(<Heading>Main title</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Main title');
  });

  it.each([1, 2, 3, 4, 5, 6])('renders as h%i when level is %i', (level) => {
    render(<Heading level={level}>Title {level}</Heading>);
    expect(screen.getByRole('heading', { level })).toBeInTheDocument();
  });

  it('applies level-specific size classes', () => {
    render(<Heading level={1}>Title</Heading>);
    expect(screen.getByRole('heading', { level: 1 }).className).toContain(
      'text-5xl',
    );
  });

  it('applies custom className', () => {
    render(<Heading className="custom-heading">Title</Heading>);
    expect(screen.getByRole('heading').className).toContain('custom-heading');
  });

  it('forwards additional props', () => {
    render(
      <Heading id="page-title" data-testid="heading">
        Title
      </Heading>,
    );
    expect(screen.getByTestId('heading')).toHaveAttribute('id', 'page-title');
  });

  it('renders long children text', () => {
    const longText = 'Heading '.repeat(50);
    render(<Heading>{longText}</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      longText.trim(),
    );
  });
});
