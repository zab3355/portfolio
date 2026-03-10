import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTopButton from '../shared/components/scrollToTopButton';

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box component="main" sx={{ width: '100%', minHeight: '100vh' }}>
      <Outlet />
      <ScrollToTopButton
        show={showScrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </Box>
  );
};

export default Layout;
