import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Fab, LinearProgress, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../shared/styles/lightTheme';
import { darkTheme } from '../shared/styles/darkTheme';

const NavLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const DrawerPaper = styled('div')({
  backgroundColor: '#f37b24',
  animation: 'slideDown 0.3s ease-out',
  '@keyframes slideDown': {
    from: {
      transform: 'translateY(-100%)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
});

const ScrollToTopButton = styled(Fab)({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  display: 'none',
  zIndex: 1000,
});

const ProgressBar = styled(LinearProgress)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  backgroundColor: '#f37b24',
});

const LogoButton = styled(Logo)({
  height: '60px',
  marginTop: '12px',
  width: 'fit-content'
});


function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
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
        <AppBar position="static" style={{ backgroundColor: isMobile ? '#f37b24' : '#3b4658' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
            <LogoButton/>
            </Typography>
            {!isMobile && (
              <NavLinks>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
                <Button color="inherit" component={Link} to="/portfolio">Portfolio</Button>
                <Button color="inherit" component={Link} to="/contact">Contact</Button>
                <Switch checked={isDarkMode} onChange={handleThemeChange} />
              </NavLinks>
            )}
            {isMobile && (
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {!isMobile && <ProgressBar variant="determinate" value={progress} />}
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ component: DrawerPaper }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about" onClick={toggleDrawer(false)}>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/portfolio" onClick={toggleDrawer(false)}>
                <ListItemText primary="Portfolio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleThemeChange}>
                <ListItemText primary="Toggle Theme" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <ScrollToTopButton
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          style={{ display: showScroll ? 'inline-flex' : 'none' }}
        >
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;