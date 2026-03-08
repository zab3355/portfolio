import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Wrapper = styled(Box)({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
});

interface OrbProps {
  color: string;
}

const Orb = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'color',
})<OrbProps>(({ color }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(120px)',
  opacity: 0.45,
  background: color,
  pointerEvents: 'none',
}));

const GradientBackground = () => {
  const theme = useTheme();
  const { orb1, orb2, orb3 } = theme.palette.custom.splash;

  return (
    <Wrapper>
      {/* Orb 1 – brand orange, top-left drift */}
      <Orb
        color={orb1}
        style={{ width: 600, height: 600, top: '-10%', left: '-10%' }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Orb 2 – indigo, top-right */}
      <Orb
        color={orb2}
        style={{ width: 500, height: 500, top: '-5%', right: '-5%' }}
        animate={{ x: [0, -60, 30, 0], y: [0, 80, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Orb 3 – purple, center-bottom */}
      <Orb
        color={orb3}
        style={{ width: 400, height: 400, bottom: '15%', left: '35%' }}
        animate={{ x: [0, 40, -60, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Wrapper>
  );
};

export default GradientBackground;
