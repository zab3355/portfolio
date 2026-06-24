import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AnimationContainer = styled(Box)({
  animation: 'fadeIn 1s',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

export const Section = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '94%',
  margin: '4rem',
});

export const SectionMobile = styled(Box)({
  display: 'block',
  justifyContent: 'space-between',
  width: 'auto',
});

export const ImageContainer = styled(Box)({
  flex: '1',
  margin: '1rem',
});

export const TextContainer = styled(Box)({
  flex: '1',
});

export const DescriptionContainer = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  marginBottom: '1rem',
  margin: '1rem',
});

export const ListContainer = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '16px',
});
