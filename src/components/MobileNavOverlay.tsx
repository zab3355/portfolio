import { Box, Typography, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
import { NAV_ITEMS } from '../shared/config/navItems';
import BinaryRain from '../shared/components/BinaryRain';

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
  onThemeChange: () => void;
  isDarkMode: boolean;
  selectedRoute: string;
}

const Orb = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.15,
  pointerEvents: 'none',
});

const RainOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.08,
  pointerEvents: 'none',
  zIndex: 0,
});

const overlayVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
};

const MobileNavOverlay = ({
  open,
  onClose,
  onThemeChange,
  isDarkMode,
  selectedRoute,
}: MobileNavOverlayProps) => {
  const theme = useTheme();
  const { orb1 } = theme.palette.custom.splash;
  const accent = theme.palette.custom.orangePalette.background;

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div as any}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#07070f',
            zIndex: (t: any) => t.zIndex.appBar + 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pl: 4,
            overflow: 'hidden',
          }}
        >
          <RainOverlay>
            <BinaryRain variant="banner" />
          </RainOverlay>
          <Orb
            style={{ width: 350, height: 350, top: '-15%', right: '-10%', background: orb1 }}
            animate={{ x: [0, 20, -10, 0], y: [0, 15, -8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          <Box
            component={motion.nav as any}
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            sx={{ position: 'relative', zIndex: 2, width: '100%' }}
          >
            {NAV_ITEMS.map(({ path, label }) => {
              const isActive = selectedRoute === path;
              return (
                <motion.div key={path} variants={linkVariants}>
                  <Box
                    component={Link}
                    to={path}
                    onClick={onClose}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      mb: 2,
                      position: 'relative',
                      width: 'fit-content',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        height: 2,
                        width: '100%',
                        background: accent,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: { xs: '44px', sm: '56px' },
                        color: isActive ? accent : 'rgba(255,255,255,0.92)',
                        lineHeight: 1.1,
                        transition: 'color 0.2s',
                        '&:hover': { color: accent },
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </motion.div>
              );
            })}

            <motion.div variants={linkVariants}>
              <IconButton
                onClick={onThemeChange}
                aria-label="Change theme"
                sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, ml: -1 }}
              >
                {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default MobileNavOverlay;
