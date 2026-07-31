import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormWrapper from './FormWrapper';

describe('FormWrapper', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders children inside a form', () => {
    render(
      <FormWrapper>
        <input placeholder="Field" />
      </FormWrapper>,
    );
    expect(screen.getByPlaceholderText('Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox').closest('form')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormWrapper className="custom-form">
        <span>Content</span>
      </FormWrapper>,
    );
    expect(container.querySelector('form').className).toContain('custom-form');
  });

  it('calls onSubmit when form is submitted', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <FormWrapper onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </FormWrapper>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders as semantic form element', () => {
    const { container } = render(<FormWrapper>Child</FormWrapper>);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <FormWrapper>
        <input placeholder="First" />
        <input placeholder="Second" />
      </FormWrapper>,
    );
    expect(screen.getByPlaceholderText('First')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Second')).toBeInTheDocument();
  });
});
