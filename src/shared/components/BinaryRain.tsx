import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useRafMousemove from '../hooks/useRafMousemove';

interface BinaryRainProps {
  variant?: 'default' | 'banner';
  intensity?: 'default' | 'subtle';
}

const CanvasWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<BinaryRainProps>(({ variant }) =>
  variant === 'banner'
    ? {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        zIndex: 1,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
      }
);

const BinaryRain = ({ variant = 'default', intensity = 'default' }: BinaryRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseColRef = useRef(-999);
  const rafRef = useRef<number>(0);
  const boundsRef = useRef<DOMRect | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rainColor = theme.palette.custom.splash.binaryColor;
  const accentColor = theme.palette.custom.orangePalette.background;

  useRafMousemove((e) => {
    const rect = boundsRef.current;
    if (!rect) {
      return;
    }

    if (
      e.clientX < rect.left
      || e.clientX > rect.right
      || e.clientY < rect.top
      || e.clientY > rect.bottom
    ) {
      mouseColRef.current = -999;
      return;
    }

    mouseColRef.current = Math.floor((e.clientX - rect.left) / 13);
  }, true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols: number;
    let drops: number[];
    const fontSize = intensity === 'subtle' ? 15 : 13;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      boundsRef.current = canvas.getBoundingClientRect();
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    };

    resize();

    const draw = () => {
      ctx.fillStyle = intensity === 'subtle' ? 'rgba(7, 7, 15, 0.05)' : 'rgba(7, 7, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const dist = Math.abs(i - mouseColRef.current);
        const near = dist < 8 && mouseColRef.current > -900;
        const char = Math.random() > 0.5 ? '1' : '0';

        if (near) {
          // Columns near the cursor glow orange with higher opacity
          const intensity = 1 - dist / 8;
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.4 + intensity * 0.55;
        } else {
          ctx.fillStyle = rainColor;
          ctx.globalAlpha = Math.random() * 0.6 + 0.2;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Columns near cursor reset more frequently (faster rain)
        if (drops[i] * fontSize > canvas.height && Math.random() > (near ? 0.92 : 0.975)) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };

    const onMouseLeave = () => {
      mouseColRef.current = -999;
    };

    const targetInterval = intensity === 'subtle'
      ? (isMobile ? 120 : 90)
      : (isMobile ? 100 : 60);
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime >= targetInterval) {
        draw();
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [rainColor, accentColor, intensity, isMobile]);

  return (
    <CanvasWrapper variant={variant}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </CanvasWrapper>
  );
};

export default BinaryRain;
