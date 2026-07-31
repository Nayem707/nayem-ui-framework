import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from './Toast';

describe('Toast', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders message', () => {
    render(<Toast message="Saved successfully" />);
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it.each(['info', 'success', 'warning', 'error'])(
    'applies %s type background class',
    (type) => {
      const { container } = render(
        <Toast type={type} message={`${type} toast`} />,
      );
      const expected = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
      };
      expect(container.firstChild.className).toContain(expected[type]);
    },
  );

  it('renders close button', () => {
    render(<Toast message="Toast" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<Toast message="Toast" onClose={handleClose} />);
    await user.click(screen.getByRole('button', { name: '×' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
    vi.useFakeTimers();
  });

  it('calls onClose automatically after duration', () => {
    const handleClose = vi.fn();
    render(<Toast message="Auto close" onClose={handleClose} duration={3000} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not auto-close when duration is 0', () => {
    const handleClose = vi.fn();
    render(<Toast message="Persistent" onClose={handleClose} duration={0} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not auto-close when onClose is absent', () => {
    render(<Toast message="No handler" duration={3000} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('No handler')).toBeInTheDocument();
  });

  it('cleans up timer on unmount', () => {
    const handleClose = vi.fn();
    const { unmount } = render(
      <Toast message="Unmount" onClose={handleClose} duration={5000} />,
    );
    unmount();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(handleClose).not.toHaveBeenCalled();
  });
});
