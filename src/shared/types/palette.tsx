import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
      custom: {
        primary: {
          main: string;
          dark: string;
          light: string;
          contrastText: string;
        };
        secondary: {
          main: string;
        };
        background: {
          default: string;
          paper: string;
        };
        text: {
          primary: string;
          secondary: string;
        };
        navbar: {
          desktopBackground: string;
          mobileBackground: string;
          desktopTextColor: string;
          mobileTextColor: string;
        };
        scrollToTopButton: {
          background: string;
          backgroundHover: string;
        };
        progressBar: {  
          background: string;
          backgroundForeground: string;
        };
      };
    }
  
    interface PaletteOptions {
      custom?: {
        primary?: {
          main?: string;
          dark?: string;
          light?: string;
          contrastText?: string;
        };
        secondary?: {
          main?: string;
        };
        background?: {
          default?: string;
          paper?: string;
        };
        text?: {
          primary?: string;
          secondary?: string;
        };
        navbar: {
          desktopBackground: string;
          mobileBackground: string;
          desktopTextColor: string;
          mobileTextColor: string;
        };
        navbarDrawer: {
          background: string;
        };
        scrollToTopButton: {
          background: string;
          backgroundHover: string;
        };
        progressBar: {  
          background: string;
          backgroundForeground: string;
        };
        base: {
          white: string;
          black: string;
        };
      };
    }
  }
  