import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock ESM-only modules that Jest can't transform
jest.mock('react-markdown', () => ({ __esModule: true, default: () => null }));

// Mock browser API components
jest.mock('./shared/components/BinaryRain', () => () => <div data-testid="binary-rain" />);
jest.mock('./shared/components/GradientBackground', () => () => <div data-testid="gradient-bg" />);
jest.mock('./shared/components/CustomCursor', () => () => <div data-testid="custom-cursor" />);
jest.mock('typewriter-effect', () => () => <span data-testid="typewriter" />);

import App from './App';

describe('App', () => {
  it('renders the home page', () => {
    render(<App />);
    expect(screen.getByText(/Zachary/i)).toBeInTheDocument();
  });

  it('renders the custom cursor', () => {
    render(<App />);
    expect(screen.getByTestId('custom-cursor')).toBeInTheDocument();
  });

  it('renders the gradient background on the home page', () => {
    render(<App />);
    expect(screen.getByTestId('gradient-bg')).toBeInTheDocument();
  });

  it('renders the binary rain on the home page', () => {
    render(<App />);
    expect(screen.getByTestId('binary-rain')).toBeInTheDocument();
  });
});
