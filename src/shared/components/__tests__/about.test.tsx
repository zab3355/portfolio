import React from 'react';
import { render, screen } from '../../test-utils';
import About from '../about';
import { aboutText } from '../../constants/constants';

describe('About', () => {
  it('renders the heading', () => {
    render(<About />);
    // SectionHeader splits title into per-letter spans but has aria-label for accessibility
    expect(screen.getByRole('heading', { name: aboutText.heading })).toBeInTheDocument();
  });

  it('renders the about image with correct alt text', () => {
    render(<About />);
    expect(screen.getByAltText('Zach Brown')).toBeInTheDocument();
  });

  it('renders all expertise bullet points', () => {
    render(<About />);
    // dangerouslySetInnerHTML renders HTML — check list items count
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(aboutText.expertise.length);
  });

  it('renders the conclusion text', () => {
    render(<About />);
    // conclusion starts with a newline + "I thrive..." — use partial match
    expect(screen.getByText(/I thrive on turning complex challenges/)).toBeInTheDocument();
  });
});
