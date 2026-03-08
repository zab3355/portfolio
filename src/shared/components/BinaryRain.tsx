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
  const theme = useTheme();
  const rainColor = theme.palette.custom.splash.binaryColor;

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
      ctx.fillStyle = rainColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        ctx.globalAlpha = Math.random() * 0.6 + 0.2;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };

    const interval = setInterval(draw, 60);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [rainColor]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </CanvasWrapper>
  );
};

export default BinaryRain;
