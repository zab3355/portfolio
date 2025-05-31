import { Box, Button, Typography, useTheme, useMediaQuery, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { splashText } from '../shared/constants/constants';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { ReactComponent as Arrows } from '../assets/icons/arrows.svg';
import bostonImage from '../assets/images/boston.jpg';
import Projects from '../shared/components/projects';
import About from '../shared/components/about';
import ContactForm from '../shared/components/contactForm';

const SplashContainer = styled(Box)(() => ({
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

const ScrollButton = styled(Button)({
  position: 'absolute',
  left: 0,
  right: 0,
  margin: '0 auto',
  bottom: '2rem',
  zIndex: 2,
});


const ArrowsButton = styled(Arrows)({
  width: '60px',
  height: '200px',
  animation: 'arrow 0s infinite',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  '& path': {
    stroke: '#FF7B00',
    fill: 'transparent',
    strokeWidth: '1px',
    animation: 'arrow 2s infinite',
  },
  "@keyframes arrow": {
    "0%": { opacity: 0 },
    "40%": { opacity: 1 },
    "80%": { opacity: 0 },
    "100%": { opacity: 0 },
  },

  "@-webkit-keyframes arrow": {
    "0%": { opacity: 0 },
    "40%": { opacity: 1 },
    "80%": { opacity: 0 },
    "100%": { opacity: 0 },
  },

  "& path.a1": {
    animationDelay: "-1s",
    WebkitAnimationDelay: "-1s",
  },

  "& path.a2": {
    animationDelay: "-0.5s",
    WebkitAnimationDelay: "-0.5s",
  },

  "& path.a3": {
    animationDelay: "0s",
    WebkitAnimationDelay: "0s",
  },
  

});

const ViewProjectBox = styled(Box)(() => ({
  textAlign: 'center',
  marginTop: '30px',
}));


const CircleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.custom.primary.main,
  color: theme.palette.custom.base.white,
  width: '200px',
  fontFamily: 'Poppins',
  borderRadius: '50px',
  cursor: 'pointer',
  height: '50px',
  '&:hover': {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: theme.palette.custom.primary.main
  },
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
<ContactForm/>
    </div>
  );
};

export default Home;