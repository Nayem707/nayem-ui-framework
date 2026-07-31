import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Row from './Row';

describe('Row', () => {
  it('renders children', () => {
    render(
      <Row>
        <span>Left</span>
        <span>Right</span>
      </Row>,
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies default flex classes', () => {
    const { container } = render(<Row>Content</Row>);
    const row = container.firstChild;
    expect(row.className).toContain('flex');
    expect(row.className).toContain('flex-wrap');
    expect(row.className).toContain('items-center');
    expect(row.className).toContain('justify-start');
    expect(row.className).toContain('gap-4');
  });

  it('omits flex-wrap when wrap is false', () => {
    const { container } = render(<Row wrap={false}>Content</Row>);
    expect(container.firstChild.className).not.toContain('flex-wrap');
  });

  it('applies custom align and justify', () => {
    const { container } = render(
      <Row align="start" justify="between">
        Content
      </Row>,
    );
    expect(container.firstChild.className).toContain('items-start');
    expect(container.firstChild.className).toContain('justify-between');
  });

  it('applies custom gap', () => {
    const { container } = render(<Row gap={8}>Content</Row>);
    expect(container.firstChild.className).toContain('gap-8');
  });

  it('applies custom className', () => {
    const { container } = render(<Row className="custom-row">Content</Row>);
    expect(container.firstChild.className).toContain('custom-row');
  });
});
