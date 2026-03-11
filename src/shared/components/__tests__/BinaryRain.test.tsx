import React from 'react';
import { render } from '../../test-utils';
import BinaryRain from '../BinaryRain';

const mockCtx = {
  fillRect: jest.fn(),
  fillText: jest.fn(),
  font: '',
  fillStyle: '',
  globalAlpha: 1,
};

beforeAll(() => {
  // jsdom has no canvas implementation — provide minimal mock
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx as any);
  // ResizeObserver not available in jsdom
  (global as any).ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('BinaryRain', () => {
  it('renders a canvas element', () => {
    const { container } = render(<BinaryRain />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('requests a 2d canvas context on mount', () => {
    render(<BinaryRain />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
  });

  it('starts the draw interval and clears it on unmount', () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = render(<BinaryRain />);
    expect(setIntervalSpy).toHaveBeenCalled();

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();

    jest.useRealTimers();
    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  it('registers and removes mousemove and mouseleave listeners', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<BinaryRain />);
    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('calls fillRect to clear canvas on each draw tick', () => {
    jest.useFakeTimers();

    render(<BinaryRain />);
    jest.advanceTimersByTime(60); // one draw tick (interval = 60ms)

    expect(mockCtx.fillRect).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
