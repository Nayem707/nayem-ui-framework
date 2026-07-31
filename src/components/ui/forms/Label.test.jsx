import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  it('renders children text', () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('renders required indicator when required is true', () => {
    render(<Label required>Required field</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('does not render required indicator by default', () => {
    render(<Label>Optional field</Label>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Label</Label>);
    expect(screen.getByText('Label').className).toContain('custom-label');
  });

  it('forwards additional props', () => {
    render(
      <Label id="field-label" data-testid="label">
        Field
      </Label>,
    );
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('id', 'field-label');
  });

  it('renders as semantic label element', () => {
    render(<Label>Semantic</Label>);
    expect(screen.getByText('Semantic').tagName).toBe('LABEL');
  });

  it('renders long children text', () => {
    const longText = 'Label '.repeat(50);
    render(<Label>{longText}</Label>);
    expect(screen.getByText(longText.trim())).toBeInTheDocument();
  });
});
