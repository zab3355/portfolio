import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
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

  // Main ring — spring lagged behind cursor
  const ringX = useSpring(mouseX, SPRING_CONFIG);
  const ringY = useSpring(mouseY, SPRING_CONFIG);

  // Comet trail — 4 springs at decreasing stiffness, each follows mouse directly.
  // When moving fast they spread out behind cursor; when still they converge to a point.
  const t1x = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const t1y = useSpring(mouseY, { stiffness: 140, damping: 22 });
  const t2x = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const t2y = useSpring(mouseY, { stiffness: 90, damping: 20 });
  const t3x = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const t3y = useSpring(mouseY, { stiffness: 55, damping: 18 });
  const t4x = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const t4y = useSpring(mouseY, { stiffness: 30, damping: 15 });

  // Velocity-based ring stretch — ring stretches in direction of travel
  const velX = useVelocity(ringX);
  const velY = useVelocity(ringY);

  const ringScaleX = useTransform(
    [velX, velY] as any,
    ([vx, vy]: number[]) => Math.min(2.2, 1 + Math.sqrt(vx * vx + vy * vy) * 0.0012)
  );
  const ringScaleY = useTransform(
    [velX, velY] as any,
    ([vx, vy]: number[]) => Math.max(0.55, 1 - Math.sqrt(vx * vx + vy * vy) * 0.0007)
  );
  const ringRotate = useTransform(
    [velX, velY] as any,
    ([vx, vy]: number[]) =>
      Math.abs(vx) + Math.abs(vy) > 15 ? (Math.atan2(vy, vx) * 180) / Math.PI : 0
  );

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

  const trailPoints = [
    { x: t4x, y: t4y, size: 3,  opacity: 0.15 },
    { x: t3x, y: t3y, size: 4,  opacity: 0.25 },
    { x: t2x, y: t2y, size: 5,  opacity: 0.35 },
    { x: t1x, y: t1y, size: 6,  opacity: 0.45 },
  ];

  return (
    <>
      {/* Comet tail — springs with decreasing stiffness fan out behind cursor when moving */}
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

      {/* Dot — snaps to cursor position exactly */}
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

      {/* Ring — spring lagged, stretches in direction of travel */}
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
          scaleX: isHovering ? 1 : ringScaleX,
          scaleY: isHovering ? 1 : ringScaleY,
          rotate: isHovering ? 0 : ringRotate,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
