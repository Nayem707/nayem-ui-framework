import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders with default type text', () => {
    render(<InputField placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with custom type', () => {
    render(<InputField type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('renders with id and name attributes', () => {
    render(<InputField id="email" name="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('renders as disabled', () => {
    render(<InputField disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
    expect(input.className).toContain('cursor-not-allowed');
    expect(input.className).toContain('bg-gray-100');
  });

  it('applies custom className', () => {
    render(<InputField className="custom-input" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom').className).toContain(
      'custom-input',
    );
  });

  it('forwards additional props', () => {
    render(
      <InputField
        placeholder="Test"
        aria-label="Username"
        data-testid="username-input"
      />,
    );
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
  });

  it('handles controlled value and onChange', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <InputField value="" onChange={handleChange} placeholder="Type here" />,
    );
    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
    rerender(
      <InputField value="hello" onChange={handleChange} placeholder="Type here" />,
    );
    expect(input).toHaveValue('hello');
  });

  it('accepts empty placeholder', () => {
    render(<InputField />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '');
  });

  it('renders as semantic input element', () => {
    render(<InputField placeholder="Input" />);
    expect(screen.getByRole('textbox').tagName).toBe('INPUT');
  });
});
