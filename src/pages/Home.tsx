import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import CircleButton from '../shared/components/circleButton';
import ScrollButton from '../shared/components/scrollButton';
import { splashText } from '../shared/constants/constants';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import ArrowsButton from '../shared/components/arrowsButton';
import bostonImage from '../assets/images/boston.jpg';
import Projects from '../shared/components/projects';
import About from '../shared/components/about';
import ContactForm from '../shared/components/contactForm';

const SplashContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url(${bostonImage})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2rem',
  zIndex: 2,
}));

const TitleHeadingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontWeight: '700',
  fontSize: '75px',
  whiteSpace: 'nowrap',
  color: theme.palette.custom.base.white
}));

const TitleHeadingTypeWriter = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.base.white
}));

const TitleHeadingTextMobile = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  fontFamily: 'Poppins',
  fontWeight: '700',
  textAlign: 'center',
  fontSize: '42px',
  color: theme.palette.custom.base.white
}));

const TitleHeadingTypeWriterMobile = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  marginTop: '20px',
  color: theme.palette.custom.base.white
}));

const ContentContainer = styled(motion.div)({
  textAlign: 'center',
  flex: 1,
});

const ImageContainer = styled(motion.div)({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
});




const ViewProjectBox = styled(Box)(() => ({
  textAlign: 'center',
  marginTop: '30px',
}));



const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div>
      <SplashContainer>
        {!isMobile ? (
          <ContentContainer
            initial={{ y: '-100vw' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <TitleHeadingText>
              {splashText.title}
            </TitleHeadingText>
            <TitleHeadingTypeWriter variant="h4">
              <Typewriter
                options={{
                  strings: splashText.typewriterTexts,
                  autoStart: true,
                  loop: true,
                }}
              />
            </TitleHeadingTypeWriter>
            <ViewProjectBox>
              <CircleButton onClick={handleScroll}>View Projects</CircleButton>
            </ViewProjectBox>
          </ContentContainer>) : (
          <ContentContainer
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <TitleHeadingTextMobile>
              {splashText.title}
            </TitleHeadingTextMobile>
            <TitleHeadingTypeWriterMobile>
              <Typewriter
                options={{
                  strings: splashText.typewriterTexts,
                  autoStart: true,
                  loop: true,
                }}
              />
            </TitleHeadingTypeWriterMobile>
            <ViewProjectBox>
              <CircleButton onClick={handleScroll}>View Projects</CircleButton>
            </ViewProjectBox>
          </ContentContainer>)}
        <ScrollButton onClick={handleScroll}>
          <ArrowsButton />
        </ScrollButton>
      </SplashContainer>
      <Projects />
      <About />
      <ContactForm />
    </div>
  );
};

export default Home;