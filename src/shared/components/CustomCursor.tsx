import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

const CustomCursor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const isVisibleRef = useRef(false);
  const particleIdRef = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Comet trail — 4 springs at decreasing stiffness
  const t1x = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const t1y = useSpring(mouseY, { stiffness: 140, damping: 22 });
  const t2x = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const t2y = useSpring(mouseY, { stiffness: 90, damping: 20 });
  const t3x = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const t3y = useSpring(mouseY, { stiffness: 55, damping: 18 });
  const t4x = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const t4y = useSpring(mouseY, { stiffness: 30, damping: 15 });

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onClick = (e: MouseEvent) => {
      const count = 10;
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        angle: (i / count) * 360 + Math.random() * 20,
        distance: 28 + Math.random() * 36,
        size: 4 + Math.random() * 4,
      }));
      setParticles(p => [...p, ...newParticles]);
      const ids = new Set(newParticles.map(p => p.id));
      setTimeout(() => {
        setParticles(p => p.filter(pt => !ids.has(pt.id)));
      }, 650);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const accent = theme.palette.custom.orangePalette.background;

  const trailPoints = [
    { x: t4x, y: t4y, size: 3,  opacity: 0.15 },
    { x: t3x, y: t3y, size: 4,  opacity: 0.25 },
    { x: t2x, y: t2y, size: 5,  opacity: 0.35 },
    { x: t1x, y: t1y, size: 6,  opacity: 0.45 },
  ];

  return (
    <>
      {/* Comet tail */}
      {trailPoints.map((t, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: t.x,
            y: t.y,
            translateX: '-50%',
            translateY: '-50%',
            width: t.size,
            height: t.size,
            borderRadius: '50%',
            backgroundColor: accent,
            pointerEvents: 'none',
            zIndex: 99996,
            opacity: isVisible ? t.opacity : 0,
          }}
        />
      ))}

      {/* Main dot — snaps to cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: accent,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          boxShadow: `0 0 8px 2px ${accent}88`,
        }}
      />

      {/* Click particle burst */}
      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;
          return (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%' }}
              animate={{ x: p.x + tx, y: p.y + ty, opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: accent,
                pointerEvents: 'none',
                zIndex: 99997,
                boxShadow: `0 0 6px 1px ${accent}99`,
              }}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
