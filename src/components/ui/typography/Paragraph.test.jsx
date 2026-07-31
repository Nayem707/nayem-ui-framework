import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Paragraph', () => {
  it('renders children', () => {
    render(<Paragraph>Paragraph text</Paragraph>);
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('applies default body variant classes', () => {
    render(<Paragraph>Body</Paragraph>);
    expect(screen.getByText('Body').className).toContain('text-base');
  });

  it.each(['body', 'small', 'caption', 'error'])(
    'applies %s variant classes',
    (variant) => {
      render(<Paragraph variant={variant}>Text</Paragraph>);
      const expected = {
        body: 'text-base',
        small: 'text-sm',
        caption: 'text-xs',
        error: 'text-red-600',
      };
      expect(screen.getByText('Text').className).toContain(expected[variant]);
    },
  );

  it('applies custom className', () => {
    render(<Paragraph className="custom-paragraph">Text</Paragraph>);
    expect(screen.getByText('Text').className).toContain('custom-paragraph');
  });

  it('forwards additional props', () => {
    render(
      <Paragraph data-testid="paragraph" id="intro">
        Text
      </Paragraph>,
    );
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveAttribute('id', 'intro');
  });

  it('renders as semantic paragraph element', () => {
    render(<Paragraph>Semantic</Paragraph>);
    expect(screen.getByText('Semantic').tagName).toBe('P');
  });
});
