import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

describe('Alert', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders message', () => {
    render(<Alert message="Something happened" />);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Notice" message="Details here" />);
    expect(screen.getByText('Notice')).toBeInTheDocument();
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('does not render title when absent', () => {
    render(<Alert message="Only message" />);
    expect(screen.queryByText('Notice')).not.toBeInTheDocument();
  });

  it.each(['info', 'success', 'warning', 'error'])(
    'renders %s type with icon',
    (type) => {
      render(<Alert type={type} message={`${type} alert`} />);
      const expected = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌',
      };
      expect(screen.getByText(expected[type])).toBeInTheDocument();
      expect(screen.getByText(`${type} alert`)).toBeInTheDocument();
    },
  );

  it('applies custom className', () => {
    const { container } = render(
      <Alert message="Alert" className="custom-alert" />,
    );
    expect(container.firstChild.className).toContain('custom-alert');
  });

  it('renders close button when onClose is provided', () => {
    render(<Alert message="Closable" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('does not render close button when onClose is absent', () => {
    render(<Alert message="Not closable" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<Alert message="Closable" onClose={handleClose} />);
    await user.click(screen.getByRole('button', { name: '×' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders long message text', () => {
    const longMessage = 'Alert '.repeat(100);
    render(<Alert message={longMessage.trim()} />);
    expect(screen.getByText(longMessage.trim())).toBeInTheDocument();
  });
});
