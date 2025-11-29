import HomeIcon from '@mui/icons-material/HomeOutlined';
import PortfolioIcon from '@mui/icons-material/PhotoAlbumOutlined';
import BlogIcon from '@mui/icons-material/LibraryBooks';
import ContactIcon from '@mui/icons-material/TtyOutlined';
import { NavItem } from '../types/types';

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home', Icon: HomeIcon },
  { path: '/portfolio', label: 'Portfolio', Icon: PortfolioIcon },
  { path: '/blog', label: 'Blog', Icon: BlogIcon },
  { path: '/contact', label: 'Contact', Icon: ContactIcon },
];
