import React from 'react';
import { render } from '../../test-utils';
import CustomCursor from '../CustomCursor';

// Mock framer-motion — animation springs don't work in jsdom
jest.mock('framer-motion', () => {
  const ReactMock = require('react');
  const MockDiv = ReactMock.forwardRef(({ children, ...props }: any, ref: any) =>
    ReactMock.createElement('div', { ...props, ref }, children)
  );
  return {
    AnimatePresence: ({ children }: any) => ReactMock.createElement(ReactMock.Fragment, null, children),
    motion: { div: MockDiv },
    useMotionValue: (init: number) => ({ set: jest.fn(), get: () => init }),
    useSpring: (v: any) => v,
    useTransform: () => ({ get: jest.fn(() => 1) }),
    useVelocity: () => ({ get: jest.fn(() => 0) }),
  };
});

// Mock useMediaQuery — default to desktop (non-mobile)
jest.mock('@mui/material/useMediaQuery', () => jest.fn(() => false));

describe('CustomCursor', () => {
  it('renders cursor elements on desktop', () => {
    const { container } = render(<CustomCursor />);
    // Should render the cursor elements (dot, ring, trail dots = 6 total div elements)
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('returns null on mobile', () => {
    const useMediaQuery = require('@mui/material/useMediaQuery');
    useMediaQuery.mockReturnValue(true); // isMobile = true

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();

    useMediaQuery.mockReturnValue(false); // reset
  });

  it('registers and removes mouse event listeners', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CustomCursor />);
    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), { passive: true });
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function), { passive: true });

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('does not register document hover listeners on desktop', () => {
    const docAddSpy = jest.spyOn(document, 'addEventListener');
    const docRemoveSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<CustomCursor />);
    expect(docAddSpy).not.toHaveBeenCalled();

    unmount();
    expect(docRemoveSpy).not.toHaveBeenCalled();

    docAddSpy.mockRestore();
    docRemoveSpy.mockRestore();
  });
});
