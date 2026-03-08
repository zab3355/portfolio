import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SPRING_CONFIG = { stiffness: 180, damping: 22 };

const CustomCursor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, SPRING_CONFIG);
  const ringY = useSpring(mouseY, SPRING_CONFIG);

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

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"]')) setIsHovering(true);
    };
    const onLeaveInteractive = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as Element | null;
      if (!relatedTarget || !relatedTarget.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnterInteractive);
    document.addEventListener('mouseout', onLeaveInteractive);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnterInteractive);
      document.removeEventListener('mouseout', onLeaveInteractive);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const accent = theme.palette.custom.orangePalette.background;

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: accent,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Ring — spring-lagged */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 20 : 34,
          height: isHovering ? 20 : 34,
          borderRadius: '50%',
          border: `2px solid ${accent}`,
          backgroundColor: isHovering ? `${accent}33` : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
