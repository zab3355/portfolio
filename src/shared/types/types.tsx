import { SxProps, Theme } from "@mui/material";

//Global
export interface ThemeContextProps {
  isMobile: boolean;
}

export interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
  sx?: SxProps<Theme>;
}


//Navbar Types
export interface NavItem {
  path: string;
  label: string;
  Icon: React.ElementType;
}

export type NavbarProps = {
  onThemeChange: () => void;
  isDarkMode: boolean;
};


//Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
};

//Blog Types
export type MarkdownRendererProps =
  | { src: string; content?: never }
  | { src?: never; content: string };

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface BlogPost {
  img: string;
  tag: string;
  title: string;
  description: string;
  markdownPath: string;
  authors: BlogAuthor[];
  date: string;
  media?: BlogMedia[];
}

export interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
}