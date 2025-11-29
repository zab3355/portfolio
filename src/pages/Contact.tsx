import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import bannerImage from '../assets/images/banner.jpg';
import ContactForm from '../shared/components/contactForm';

const AnimationContainer = styled(Box)({
  animation: 'fadeIn 1s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
});

const SplashContainer = styled(Box)({
  width: '100%',
  height: '400px',
  background: `url(${bannerImage})`,
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
});

const ImageText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '50px',
  marginTop: '320px',
  marginLeft: '20px',
  fontWeight: '700',
  zIndex: '999',
  color: theme.palette.custom.base.white,
  animation: 'fadeIn 2s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
}));


const Contact = () => {
  return (
    <AnimationContainer>
      <ImageText>Contact</ImageText>
      <SplashContainer />
      <ContactForm />
    </AnimationContainer>
  );
};

export default Contact;