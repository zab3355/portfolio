import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function PageLoader() {
  const theme = useTheme();
  const accent = theme.palette.custom.orangePalette.background;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        width: '100%',
      }}
    >
      <CircularProgress size={48} sx={{ color: accent }} />
    </Box>
  );
}
