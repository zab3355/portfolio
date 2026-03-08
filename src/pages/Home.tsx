import { useCallback, useMemo } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import CircleButton from '../shared/components/circleButton';
import { splashText } from '../shared/constants/constants';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import Projects from '../shared/components/projects';
import About from '../shared/components/about';
import ContactForm from '../shared/components/contactForm';
import GradientBackground from '../shared/components/GradientBackground';
import BinaryRain from '../shared/components/BinaryRain';

const SplashContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundColor: theme.palette.custom.splash.background,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

const ContentContainer = styled(motion.div)({
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  padding: '0 2rem',
});

const ViewProjectBox = styled(Box)({
  textAlign: 'center',
  marginTop: '30px',
});

const ScrollIndicator = styled(Box)({
  position: 'absolute',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const accent = theme.palette.custom.orangePalette.background;

  const handleScroll = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const nameLetters = useMemo(() => splashText.title.split(''), []);

  const headingSize = isMobile ? '42px' : '75px';
  const typewriterSize = isMobile ? '22px' : '28px';

  return (
    <div>
      <SplashContainer>
        <GradientBackground />
        <BinaryRain />

        <ContentContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Staggered name with gradient shimmer */}
          <Box
            component="h1"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: headingSize,
              margin: 0,
              lineHeight: 1.1,
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              background: `linear-gradient(135deg, #ffffff 30%, ${accent} 60%, #ffffff 90%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            {nameLetters.map((char, i) => (
              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Box>

          {/* Typewriter subtitle */}
          <Box
            sx={{
              fontSize: typewriterSize,
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'Poppins',
              mt: 2,
              minHeight: '2em',
              '& .Typewriter__cursor': {
                color: accent,
                fontWeight: 300,
              },
            }}
          >
            <Typewriter
              options={{
                strings: splashText.typewriterTexts,
                autoStart: true,
                loop: true,
                cursor: '|',
              }}
            />
          </Box>

          <ViewProjectBox>
            <CircleButton onClick={handleScroll}>View Projects</CircleButton>
          </ViewProjectBox>
        </ContentContainer>

        {/* Scroll indicator */}
        <ScrollIndicator onClick={handleScroll} aria-label="Scroll to projects">
          <Box sx={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-1px',
                width: '3px',
                height: '20px',
                borderRadius: '2px',
                backgroundColor: accent,
              }}
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Box>
          <Typography sx={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Poppins' }}>
            scroll
          </Typography>
        </ScrollIndicator>
      </SplashContainer>
      <Projects />
      <About />
      <ContactForm />
    </div>
  );
};

export default Home;
