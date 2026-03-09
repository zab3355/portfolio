import React from 'react';
import { render, screen } from '../../test-utils';
import PageHeroBanner from '../PageHeroBanner';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const ReactMock = require('react');
  const MockSpan = ReactMock.forwardRef(({ children, variants, animate, initial, ...props }: any, ref: any) =>
    ReactMock.createElement('span', { ...props, ref }, children)
  );
  const MockH1 = ReactMock.forwardRef(({ children, variants, animate, initial, ...props }: any, ref: any) =>
    ReactMock.createElement('h1', { ...props, ref }, children)
  );
  return {
    motion: { span: MockSpan, h1: MockH1 },
    useMotionValue: (init: number) => ({ set: jest.fn(), get: () => init }),
    useSpring: (v: any) => v,
    useTransform: (_v: any, fn: (v: number) => number) => {
      try { return fn(0); } catch { return 0; }
    },
  };
});

// Mock BinaryRain to avoid canvas issues
jest.mock('../BinaryRain', () => () => <div data-testid="binary-rain" />);

// Provide ResizeObserver for jsdom
beforeAll(() => {
  (global as any).ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
});

describe('PageHeroBanner', () => {
  it('renders a heading with aria-label matching title', () => {
    render(<PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />);
    expect(screen.getByRole('heading', { name: 'Portfolio' })).toBeInTheDocument();
  });

  it('renders the file path as a code comment', () => {
    render(<PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />);
    expect(screen.getByText('// pages/portfolio.tsx')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <PageHeroBanner
        title="Portfolio"
        filePath="pages/portfolio.tsx"
        subtitle="A collection of my work"
      />
    );
    expect(screen.getByText('A collection of my work')).toBeInTheDocument();
  });
});
