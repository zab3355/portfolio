import { Box, Typography, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CloseRounded } from '@mui/icons-material';
import { NAV_ITEMS } from '../shared/config/navItems';
import BinaryRain from '../shared/components/BinaryRain';

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
  selectedRoute: string;
}

const OverlayContainer = styled(motion.div)({
  position: 'fixed',
  inset: 0,
  backgroundColor: '#07070f',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: 32,
  overflow: 'hidden',
});

const NavContainer = styled(motion.nav)({
  position: 'relative',
  zIndex: 2,
  width: '100%',
});

const Orb = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.18,
  pointerEvents: 'none',
});

const RainOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.06,
  pointerEvents: 'none',
  zIndex: 0,
});

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeIn: [number, number, number, number] = [0.7, 0, 0.84, 0];

const overlayVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    transition: { duration: 0.4, ease: easeIn },
  },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 240, damping: 26 },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.12 } },
};

const closeVariants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.6 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { delay: 0.35, type: 'spring' as const, stiffness: 300, damping: 22 },
  },
  exit: { opacity: 0, rotate: 90, scale: 0.6, transition: { duration: 0.15 } },
};

const MobileNavOverlay = ({ open, onClose, selectedRoute }: MobileNavOverlayProps) => {
  const theme = useTheme();
  const { orb1 } = theme.palette.custom.splash;
  const accent = theme.palette.custom.orangePalette.background;

  return (
    <AnimatePresence>
      {open && (
        <OverlayContainer
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ zIndex: theme.zIndex.appBar + 10 }}
        >
          <RainOverlay>
            <BinaryRain variant="banner" />
          </RainOverlay>

          <Orb
            style={{ width: 380, height: 380, top: '-10%', right: '-12%', background: orb1 }}
            animate={{ x: [0, 24, -12, 0], y: [0, 18, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Orb
            style={{ width: 200, height: 200, bottom: '5%', left: '-5%', background: accent }}
            animate={{ x: [0, -14, 8, 0], y: [0, 12, -6, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Close button */}
          <Box
            component={motion.div}
            variants={closeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{ display: 'inline-flex' }}
            >
              <IconButton
                onClick={onClose}
                aria-label="Close navigation"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  backdropFilter: 'blur(8px)',
                  transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderColor: accent,
                    color: accent,
                  },
                }}
              >
                <CloseRounded />
              </IconButton>
            </motion.div>
          </Box>

          {/* Nav links */}
          <NavContainer
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
                        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                      },
                      '&:hover::after': { transform: 'scaleX(1)' },
                    }}
                  >
                    <motion.span
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      style={{ display: 'block' }}
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
                    </motion.span>
                  </Box>
                </motion.div>
              );
            })}
          </NavContainer>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default MobileNavOverlay;
