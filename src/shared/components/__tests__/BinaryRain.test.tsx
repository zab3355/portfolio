import React from 'react';
import { render } from '../../test-utils';
import BinaryRain from '../BinaryRain';
import useRafMousemove from '../../hooks/useRafMousemove';

jest.mock('../../hooks/useRafMousemove', () => jest.fn());

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

  it('wires the shared rAF-paced mousemove hook', () => {
    render(<BinaryRain />);

    expect(useRafMousemove).toHaveBeenCalledWith(expect.any(Function), true);
  });
});
