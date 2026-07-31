import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders checkbox input', () => {
    render(<Checkbox id="terms" name="terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders associated label when label prop is provided', () => {
    render(<Checkbox id="terms" label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('does not render label when label prop is absent', () => {
    render(<Checkbox id="terms" />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('renders checked state', () => {
    render(<Checkbox id="terms" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders unchecked state', () => {
    render(<Checkbox id="terms" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    render(<Checkbox id="terms" onChange={handleChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state', () => {
    render(<Checkbox id="terms" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    render(<Checkbox id="terms" disabled onChange={handleChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <Checkbox id="terms" className="custom-checkbox" />,
    );
    expect(container.firstChild.className).toContain('custom-checkbox');
  });

  it('sets name attribute', () => {
    render(<Checkbox id="terms" name="accept" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'accept');
  });
});
