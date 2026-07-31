import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Buttons';

describe('Button', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders with label prop when children are absent', () => {
    render(<Button label="Submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('prefers children over label', () => {
    render(<Button label="Label text">Child text</Button>);
    expect(screen.getByRole('button', { name: 'Child text' })).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-blue-500');
    expect(button.className).toContain('px-4');
  });

  it.each(['primary', 'secondary', 'danger'])(
    'applies %s variant classes',
    (variant) => {
      render(<Button variant={variant}>Variant</Button>);
      const button = screen.getByRole('button');
      const expected = {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        danger: 'bg-red-500',
      };
      expect(button.className).toContain(expected[variant]);
    },
  );

  it.each(['sm', 'md', 'lg'])('applies %s size classes', (size) => {
    render(<Button size={size}>Sized</Button>);
    const button = screen.getByRole('button');
    const expected = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
    expect(button.className).toContain(expected[size]);
  });

  it('applies disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');
  });

  it('uses custom className without default variant classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
    expect(button.className).not.toContain('bg-blue-500');
  });

  it('applies disabled classes with custom className', () => {
    render(
      <Button className="custom-class" disabled>
        Custom Disabled
      </Button>,
    );
    expect(screen.getByRole('button').className).toContain('opacity-50');
  });

  it('applies inline style', () => {
    render(<Button style={{ backgroundColor: 'red' }}>Styled</Button>);
    expect(screen.getByRole('button').style.backgroundColor).toBe('red');
  });

  it('forwards additional props', () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Submit form' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders long children text', () => {
    const longText = 'A'.repeat(200);
    render(<Button>{longText}</Button>);
    expect(screen.getByRole('button', { name: longText })).toBeInTheDocument();
  });

  it('renders as a semantic button element', () => {
    render(<Button>Semantic</Button>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });
});
