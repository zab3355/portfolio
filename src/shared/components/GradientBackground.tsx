import { useEffect } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Wrapper = styled(Box)({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
  pointerEvents: 'none',
});

interface OrbInnerProps {
  color: string;
}

// Inner orb — handles autonomous drift via animate
const OrbInner = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'color',
})<OrbInnerProps>(({ color }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  filter: 'blur(120px)',
  opacity: 0.45,
  background: color,
  pointerEvents: 'none',
}));

const GradientBackground = () => {
  const theme = useTheme();
  const { orb1, orb2, orb3 } = theme.palette.custom.splash;

  // Mouse tracking — normalized -0.5 to 0.5 from center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Per-orb parallax at different speeds/directions — creates depth illusion
  // Orb 1: slow, same direction as mouse
  const p1X = useSpring(useTransform(mouseX, (v) => v * 60), { stiffness: 60, damping: 30 });
  const p1Y = useSpring(useTransform(mouseY, (v) => v * 45), { stiffness: 60, damping: 30 });
  // Orb 2: medium speed, moves opposite (deeper layer)
  const p2X = useSpring(useTransform(mouseX, (v) => v * -90), { stiffness: 40, damping: 25 });
  const p2Y = useSpring(useTransform(mouseY, (v) => v * -70), { stiffness: 40, damping: 25 });
  // Orb 3: slowest, large vertical range
  const p3X = useSpring(useTransform(mouseX, (v) => v * 40), { stiffness: 25, damping: 20 });
  const p3Y = useSpring(useTransform(mouseY, (v) => v * 100), { stiffness: 25, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <Wrapper>
      {/* Outer motion.div: mouse parallax. Inner OrbInner: autonomous drift. No conflict. */}

      {/* Orb 1 – brand orange, top-left */}
      <motion.div style={{ position: 'absolute', width: 600, height: 600, top: '-10%', left: '-10%', x: p1X, y: p1Y }}>
        <OrbInner
          color={orb1}
          animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Orb 2 – indigo, top-right, opposite parallax direction */}
      <motion.div style={{ position: 'absolute', width: 500, height: 500, top: '-5%', right: '-5%', x: p2X, y: p2Y }}>
        <OrbInner
          color={orb2}
          animate={{ x: [0, -60, 30, 0], y: [0, 80, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Orb 3 – purple, center-bottom, slowest */}
      <motion.div style={{ position: 'absolute', width: 400, height: 400, bottom: '15%', left: '35%', x: p3X, y: p3Y }}>
        <OrbInner
          color={orb3}
          animate={{ x: [0, 40, -60, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </Wrapper>
  );
};

export default GradientBackground;
