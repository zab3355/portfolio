import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import BinaryRain from './BinaryRain';

interface PageHeroBannerProps {
  title: string;
  filePath: string;
  subtitle?: string;
}

interface OrbProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  duration: number;
}

const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '380px',
  backgroundColor: '#07070f',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  // Push content below the fixed Navbar (xs: 86px, sm: 96px)
  paddingTop: '96px',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '86px',
  },
}));

const OrbElement = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'size' && prop !== 'duration',
})<OrbProps>(({ color, size, top, left, bottom, right, duration }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: color,
  filter: 'blur(100px)',
  opacity: 0.22,
  pointerEvents: 'none',
  zIndex: 0,
  top: top ?? 'auto',
  left: left ?? 'auto',
  bottom: bottom ?? 'auto',
  right: right ?? 'auto',
  animation: `orbDrift${duration} ${duration}s ease-in-out infinite`,
}));

const BannerContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const BottomDivider = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accent',
})<{ accent: string }>(({ accent }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '2px',
  background: `linear-gradient(to right, ${accent}, transparent)`,
  zIndex: 3,
}));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
};

const PageHeroBanner = ({ title, filePath, subtitle }: PageHeroBannerProps) => {
  const theme = useTheme();
  const accent = theme.palette.custom.orangePalette.background;
  const orb1Color = theme.palette.custom.splash.orb1;
  const orb2Color = theme.palette.custom.splash.orb2;

  const letters = title.split('');

  return (
    <BannerContainer>
      {/* Layer 1: Binary rain */}
      <Box sx={{ opacity: 0.18, position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <BinaryRain variant="banner" />
      </Box>

      {/* Layer 2: Orbs with autonomous drift */}
      <Box
        sx={{
          '@keyframes orbDrift20': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '33%': { transform: 'translate(30px, -20px)' },
            '66%': { transform: 'translate(-20px, 15px)' },
          },
          '@keyframes orbDrift25': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '33%': { transform: 'translate(-25px, 20px)' },
            '66%': { transform: 'translate(20px, -15px)' },
          },
        }}
      >
        <OrbElement
          color={orb1Color}
          size={400}
          top="-30%"
          left="-8%"
          duration={20}
        />
        <OrbElement
          color={orb2Color}
          size={300}
          bottom="-40%"
          right="-5%"
          duration={25}
        />
      </Box>

      {/* Layer 3: Banner content */}
      <BannerContent>
        {/* Code comment label */}
        <Typography
          sx={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '13px',
            color: accent,
            letterSpacing: '0.08em',
            mb: 1,
          }}
        >
          {`// ${filePath}`}
        </Typography>

        {/* Staggered shimmer title */}
        <Box
          component={motion.h1 as any}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="heading"
          aria-label={title}
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: { xs: '38px', sm: '52px' },
            margin: 0,
            lineHeight: 1.1,
            display: 'inline-flex',
            flexWrap: 'wrap',
            background: `linear-gradient(135deg, #ffffff 30%, ${accent} 60%, #ffffff 90%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'shimmer 4s linear infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '200% center' },
              '100%': { backgroundPosition: '-200% center' },
            },
          }}
        >
          {letters.map((char, i) => (
            <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </Box>

        {/* Optional subtitle */}
        {subtitle && (
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: { xs: '14px', sm: '16px' },
              color: 'rgba(255,255,255,0.65)',
              mt: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </BannerContent>

      {/* Bottom divider */}
      <BottomDivider accent={accent} />
    </BannerContainer>
  );
};

export default PageHeroBanner;
