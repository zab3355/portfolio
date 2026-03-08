import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const CanvasWrapper = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '55%',
  zIndex: 1,
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
});

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseColRef = useRef(-999);
  const theme = useTheme();
  const rainColor = theme.palette.custom.splash.binaryColor;
  const accentColor = theme.palette.custom.orangePalette.background;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 7, 15, 0.08)';
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseColRef.current = Math.floor((e.clientX - rect.left) / fontSize);
    };

    const onMouseLeave = () => {
      mouseColRef.current = -999;
    };

    const interval = setInterval(draw, 60);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [rainColor, accentColor]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </CanvasWrapper>
  );
};

export default BinaryRain;
