import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from './styles/darkTheme';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
  </MemoryRouter>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
