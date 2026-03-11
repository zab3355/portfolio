import { Box, IconButton } from '@mui/material';

interface AnimatedHamburgerProps {
  open: boolean;
  onClick: () => void;
  color?: string;
}

const BAR_STYLE = {
  display: 'block' as const,
  width: 24,
  height: 2,
  borderRadius: 2,
  transformOrigin: 'center',
  transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease',
};

const AnimatedHamburger = ({ open, onClick, color = 'currentColor' }: AnimatedHamburgerProps) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      size="large"
      sx={{ ml: 'auto', p: 1, color }}
    >
      <Box sx={{ width: 24, height: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
          }}
        />
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'none',
          }}
        />
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
          }}
        />
      </Box>
    </IconButton>
  );
};

export default AnimatedHamburger;
