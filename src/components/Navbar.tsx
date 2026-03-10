import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
import AnimatedHamburger from './AnimatedHamburger';
import MobileNavOverlay from './MobileNavOverlay';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../shared/config/navItems';
import { NavbarProps } from '../shared/types/types';
import useRouteChange from '../shared/hooks/useRouteChange';
import ScrollToTopButton from '../shared/components/scrollToTopButton';

const AppBarContainer = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})<{ scrolled: boolean }>(({ theme, scrolled }) => ({
  position: 'fixed',
  width: '100%',
  transition: 'background-color 0.3s, transform 0.3s, opacity 0.3s',
  background:
    scrolled && theme.palette.mode === 'dark'
      ? theme.palette.custom.navbar.desktopBackground
      : theme.palette.mode === 'light'
        ? theme.palette.custom.navbar.desktopBackground
        : 'transparent',
  boxShadow: scrolled ? theme.palette.custom.base.black : 'none',
  color: theme.palette.custom.navbar.desktopTextColor,
  backdropFilter: scrolled ? 'blur(6px)' : 'none',
  zIndex: theme.zIndex.appBar,
}));

const NavLinks = styled('nav')(({ theme }) => ({
  display: 'flex',
  marginLeft: 'auto',
  gap: theme.spacing(3),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar + 1,
  backgroundColor: theme.palette.custom.progressBar.background,
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.custom.progressBar.backgroundForeground,
  },
}));

const LogoButton = styled(Logo)(({ theme }) => ({
  height: 60,
  width: 'fit-content',
  ...(theme.palette.mode === 'dark' && {
    filter:
      'invert(102%) sepia(93%) saturate(0%) hue-rotate(87deg) brightness(119%) contrast(119%)',
  }),
}));

const Navbar = ({ onThemeChange, isDarkMode }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedRoute = useRouteChange();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setShowScroll(scrollTop > 300);
    setScrolled(scrollTop > 0);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBarContainer scrolled={scrolled}>
        <Toolbar
          sx={{
            minHeight: { xs: 86, sm: 96 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <LogoButton />

          {!isMobile && (
            <NavLinks>
              {NAV_ITEMS.map(({ path, label, Icon }) => (
                <Tooltip
                  key={path}
                  title={label}
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        color: theme.palette.mode === 'dark' ? '#111' : '#fff',
                      },
                    },
                  }}
                >
                  <IconButton
                    component={Link}
                    to={path}
                    size="large"
                    aria-label={label}
                    sx={{
                      color:
                        selectedRoute === path
                          ? theme.palette.custom.primary.main
                          : theme.palette.text.primary,
                      transition: 'color .2s',
                    }}
                  >
                    <Icon />
                  </IconButton>
                </Tooltip>
              ))}

              <Tooltip
                title="Change Theme"
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      color: theme.palette.mode === 'dark' ? '#111' : '#fff',
                    },
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  size="large"
                  aria-label="Theme Toggle"
                  onClick={onThemeChange}
                  sx={{
                    color:
                      selectedRoute === '/theme'
                        ? theme.palette.custom.primary.main
                        : theme.palette.text.primary,
                    transition: 'color .2s',
                  }}
                >
                  {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                </IconButton>
              </Tooltip>
            </NavLinks>
          )}

          {isMobile && (
            <AnimatedHamburger
              open={drawerOpen}
              onClick={() => setDrawerOpen((prev) => !prev)}
              color={theme.palette.text.primary}
            />
          )}
        </Toolbar>
      </AppBarContainer>

      {!isMobile && <ProgressBar variant="determinate" value={progress} />}

      <MobileNavOverlay
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedRoute={selectedRoute}
      />

      <ScrollToTopButton show={showScroll} onClick={scrollToTop} />
    </>
  );
};

export default Navbar;
