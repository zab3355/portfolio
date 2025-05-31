import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Fab, LinearProgress, ButtonProps, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../shared/styles/lightTheme';
import { darkTheme } from '../shared/styles/darkTheme';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PortfolioIcon from '@mui/icons-material/PhotoAlbumOutlined';
import BlogIcon from '@mui/icons-material/LibraryBooks';
import ContactIcon from '@mui/icons-material/TtyOutlined';
import useRouteChange from '../shared/hooks/useRouteChange';

type NavButtonProps = ButtonProps &
  LinkProps & {
    selected?: boolean;
  };
type NavbarProps = {
  onThemeChange: () => void;
  isDarkMode: boolean;
};
const AppBarContainer = styled(AppBar)<{ scrolled: boolean }>(({ theme, scrolled }) => ({
  position: 'fixed',
  width: '100%',
  transition: 'background-color 0.3s, transform 0.3s',
  background: scrolled && theme.palette.mode === "dark"
    ? theme.palette.custom.desktopBackground
    : theme.palette.mode === "light"
      ? theme.palette.custom.lightBackground
      : 'transparent',
  boxShadow: scrolled ? theme.palette.custom.base.black : 'none',
  transform: 'translateY(0)',
  opacity: scrolled ? 1 : 0.9,
}));

const NavLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: 'auto',
  color: theme.palette.text.primary,
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const NavButton = styled(Button)<NavButtonProps>(() => ({
  background: 'transparent',
}));


const DrawerHeader = styled('div')(() => ({
  display: 'inline-flex',
  paddingLeft: '12px',
  paddingRight: '12px',
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.custom.base.white,
  animation: 'fadeIn 0.3s ease-out',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-100%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '& .MuiListItem-root': {
    backgroundColor: 'transparent',
    '&:last-child': {
      borderBottom: 'none',
    },
    ' & .Mui-selected': {
      background: theme.palette.custom.primary.main,
    }
  },
  '& .MuiListItemText-root': {
    color: theme.palette.custom.base.white,
  },
}));
const HamburgerIconButton = styled(IconButton)(() => ({
  marginLeft: 'auto',
  padding: '0',
  '& svg': {
    transition: 'transform 0.3s',
  },
}));

const ScrollToTopButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.palette.custom.scrollToTopButton.backgroundHover,
  bottom: '2rem',
  right: '2rem',
  display: 'none',
  zIndex: 1000,
  '&:hover': {
    backgroundColor: theme.palette.custom.scrollToTopButton.background,
  },
}));


const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1300,
  backgroundColor: theme.palette.custom.progressBar.background,
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.custom.progressBar.backgroundForeground,
  }
}));


const LogoButton = styled(Logo)(({ theme }) => ({
  height: '60px',
  marginTop: '12px',
  width: 'fit-content',
  ...(theme.palette.mode === "dark" && {
    filter: 'invert(102%) sepia(93%) saturate(0%) hue-rotate(87deg) brightness(119%) contrast(119%)'
  })
}));


const Navbar = ({ onThemeChange, isDarkMode }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedRoute = useRouteChange();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setProgress(scrollPercent);

    if (scrollTop > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }

    if (scrollTop > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div>
        <AppBarContainer scrolled={scrolled}>
          <Toolbar>
            <Typography variant="h6">

              <LogoButton />
            </Typography>
            {!isMobile && (
              <NavLinks>
                <Tooltip title="Home" arrow>
                  <NavButton component={Link} to="/">
                    <HomeIcon style={{ color: selectedRoute === '/' ? theme.palette.custom.primary.main : theme.palette.text.primary }} />
                  </NavButton>
                </Tooltip>
                <Tooltip title="Portfolio" arrow>
                  <NavButton component={Link} to="/portfolio">
                    <PortfolioIcon style={{ color: selectedRoute === '/portfolio' ? theme.palette.custom.primary.main : theme.palette.text.primary }} />
                  </NavButton>
                </Tooltip>
                <Tooltip title="Contact" arrow>
                  <NavButton component={Link} to="/contact">
                    <ContactIcon style={{ color: selectedRoute === '/contact' ? theme.palette.custom.primary.main : theme.palette.text.primary }} />
                  </NavButton>
                </Tooltip>
                <Tooltip title="Change Theme" arrow><IconButton color="inherit" onClick={onThemeChange}>
                  {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                </IconButton></Tooltip>
              </NavLinks>
            )}
            {isMobile && (
              <HamburgerIconButton onClick={toggleDrawer(true)}>
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </HamburgerIconButton>
            )}
          </Toolbar>
        </AppBarContainer>
        {!isMobile && <ProgressBar variant="determinate" value={progress} />}
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ component: DrawerPaper }}
          ModalProps={{
            keepMounted: true,
          }}
        >

          <DrawerHeader>
            <LogoButton />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={toggleDrawer(false)}
              style={{ marginLeft: 'auto' }}
            >
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)} selected={location.pathname === '/'}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/portfolio" onClick={toggleDrawer(false)} selected={location.pathname === '/portfolio'}>
                <ListItemText primary="Portfolio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/blog" onClick={toggleDrawer(false)} selected={location.pathname === '/blog'}>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)} selected={location.pathname === '/contact'}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <ScrollToTopButton
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          style={{ display: showScroll ? 'inline-flex' : 'none', right: isMobile ? '20px' : '40px' }}
        >
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;