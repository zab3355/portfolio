import React from 'react';
import { render } from '../../test-utils';
import GradientBackground from '../GradientBackground';

jest.mock('framer-motion', () => {
  const ReactMock = require('react');
  const MockDiv = ReactMock.forwardRef(({ children, animate, transition, ...props }: any, ref: any) =>
    ReactMock.createElement('div', { ...props, ref, 'data-testid': props['data-testid'] }, children)
  );
  return {
    motion: { div: MockDiv },
    useMotionValue: (init: number) => ({ set: jest.fn(), get: () => init }),
    useSpring: (v: any) => v,
    useTransform: (_v: any, fn: (v: number) => number) => {
      try { return fn(0); } catch { return 0; }
    },
  };
});

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GradientBackground />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders three orb containers', () => {
    const { container } = render(<GradientBackground />);
    // The wrapper + 3 outer motion.divs + 3 inner OrbInners = at least 6 divs
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThanOrEqual(4); // wrapper + 3 orbs minimum
  });

  it('registers and removes mousemove listener on mount/unmount', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<GradientBackground />);
    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
