import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import Projects from '../projects';
import { projectBoxes } from '../../constants/constants';

jest.mock('framer-motion', () => {
  const ReactMock = require('react');
  const MockDiv = ReactMock.forwardRef(({ children, ...props }: any, ref: any) =>
    ReactMock.createElement('div', { ...props, ref }, children)
  );
  return {
    motion: { div: MockDiv },
    useMotionValue: (init: number) => ({ set: jest.fn(), get: () => init }),
    useSpring: (v: any) => v,
    useTransform: () => ({ get: jest.fn() }),
  };
});

const workProjects = projectBoxes.filter((b) => b.type === 'Work');
const personalProjects = projectBoxes.filter((b) => b.type === 'Personal');

describe('Projects', () => {
  it('renders the section title', () => {
    render(<Projects />);
    expect(screen.getByText('Latest Work')).toBeInTheDocument();
  });

  it('renders Work and Personal filter buttons', () => {
    render(<Projects />);
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('shows only Work projects by default', () => {
    render(<Projects />);
    workProjects.forEach((project) => {
      expect(screen.getByAltText(project.content)).toBeInTheDocument();
    });
    personalProjects.forEach((project) => {
      expect(screen.queryByAltText(project.content)).not.toBeInTheDocument();
    });
  });

  it('shows only Personal projects when Personal filter is clicked', () => {
    render(<Projects />);
    fireEvent.click(screen.getByText('Personal'));

    personalProjects.forEach((project) => {
      expect(screen.getByAltText(project.content)).toBeInTheDocument();
    });
    workProjects.forEach((project) => {
      expect(screen.queryByAltText(project.content)).not.toBeInTheDocument();
    });
  });

  it('switches back to Work projects when Work filter is clicked', () => {
    render(<Projects />);
    fireEvent.click(screen.getByText('Personal'));
    fireEvent.click(screen.getByText('Work'));

    workProjects.forEach((project) => {
      expect(screen.getByAltText(project.content)).toBeInTheDocument();
    });
  });

  it('filter buttons are keyboard accessible', () => {
    render(<Projects />);
    const personalBtn = screen.getByText('Personal');
    fireEvent.keyDown(personalBtn, { key: 'Enter' });

    personalProjects.forEach((project) => {
      expect(screen.getByAltText(project.content)).toBeInTheDocument();
    });
  });

  it('Work filter button has role=button and tabIndex', () => {
    render(<Projects />);
    const workBtn = screen.getByText('Work');
    expect(workBtn).toHaveAttribute('role', 'button');
    expect(workBtn).toHaveAttribute('tabindex', '0');
  });
});
