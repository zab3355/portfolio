import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppLoad } from '../context/AppLoadContext';
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

const ShimmerHeading = styled('h1')(({ theme }) => ({
  fontFamily: 'Poppins',
  fontWeight: 700,
  fontSize: '75px',
  margin: 0,
  lineHeight: 1.1,
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  justifyContent: 'center',
  background: `linear-gradient(135deg, #ffffff 30%, ${theme.palette.custom.orangePalette.background} 60%, #ffffff 90%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  animation: 'shimmer 4s linear infinite',
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
  },
}));

const TypewriterWrapper = styled(Box)(({ theme }) => ({
  fontSize: '28px',
  color: 'rgba(255,255,255,0.85)',
  fontFamily: 'Poppins',
  marginTop: theme.spacing(2),
  minHeight: '2em',
  '& .Typewriter__cursor': {
    color: theme.palette.custom.orangePalette.background,
    fontWeight: 300,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
  },
}));

const ScrollLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$hovered',
})<{ $hovered: boolean }>(({ theme, $hovered }) => ({
  width: '1px',
  height: '60px',
  backgroundColor: $hovered ? theme.palette.custom.orangePalette.background : 'rgba(255,255,255,0.2)',
  boxShadow: $hovered ? `0 0 10px ${theme.palette.custom.orangePalette.background}, 0 0 20px ${theme.palette.custom.orangePalette.background}55` : 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}));

const ScrollBead = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '-1px',
  width: '3px',
  height: '20px',
  borderRadius: '2px',
  backgroundColor: theme.palette.custom.orangePalette.background,
}));

const ScrollLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== '$hovered',
})<{ $hovered: boolean }>(({ theme, $hovered }) => ({
  fontSize: '10px',
  color: $hovered ? theme.palette.custom.orangePalette.background : 'rgba(255,255,255,0.4)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontFamily: 'Poppins',
  transition: 'color 0.3s ease',
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.045 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setAppReady } = useAppLoad();

  useEffect(() => { setAppReady(); }, [setAppReady]);

  const [scrollHovered, setScrollHovered] = useState(false);

  const navbarHeight = isMobile ? 86 : 96;
  const handleScroll = useCallback(() => {
    window.scrollTo({ top: window.innerHeight - navbarHeight, behavior: 'smooth' });
  }, [navbarHeight]);

  const nameLetters = useMemo(() => splashText.title.split(''), []);

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
          <ShimmerHeading>
            {nameLetters.map((char, i) => (
              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </ShimmerHeading>

          <TypewriterWrapper>
            <Typewriter
              options={{
                strings: splashText.typewriterTexts,
                autoStart: true,
                loop: true,
                cursor: '|',
              }}
            />
          </TypewriterWrapper>

          <ViewProjectBox>
            <CircleButton onClick={handleScroll}>View Projects</CircleButton>
          </ViewProjectBox>
        </ContentContainer>

        <ScrollIndicator
          onClick={handleScroll}
          onMouseEnter={() => setScrollHovered(true)}
          onMouseLeave={() => setScrollHovered(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleScroll(); }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to projects"
        >
          <ScrollLine $hovered={scrollHovered}>
            <ScrollBead
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: scrollHovered ? 0.7 : 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </ScrollLine>
          <ScrollLabel $hovered={scrollHovered}>scroll</ScrollLabel>
        </ScrollIndicator>
      </SplashContainer>
      <Projects />
      <About />
      <ContactForm />
    </div>
  );
};

export default Home;
