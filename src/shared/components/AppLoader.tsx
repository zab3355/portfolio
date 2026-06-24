import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import BinaryRain from './BinaryRain';
import { useAppLoad } from '../../context/AppLoadContext';

export default function AppLoader() {
  const { isAppReady, resetAppReady } = useAppLoad();
  const theme = useTheme();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      resetAppReady();
    }
  }, [location.pathname, resetAppReady]);

  return (
    <AnimatePresence>
      {!isAppReady && (
        <motion.div
          key="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: theme.palette.custom.splash.background,
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <BinaryRain variant="banner" />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
