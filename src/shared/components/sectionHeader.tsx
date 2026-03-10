import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  codeLabel?: string;
  sx?: object;
}

const AccentWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 12,
});

const AccentDot = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.custom.orangePalette.background,
  flexShrink: 0,
}));

const AccentLine = styled(Box)(({ theme }) => ({
  width: 160,
  height: 2,
  backgroundColor: theme.palette.custom.orangePalette.background,
}));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
  },
};

const SectionHeader = ({ title, codeLabel, sx }: SectionHeaderProps) => {
  const theme = useTheme();
  const accent = theme.palette.custom.orangePalette.background;
  const letters = title.split('');

  return (
    <Box sx={{ padding: '2rem 0 0 1rem', ...sx }}>
      {codeLabel && (
        <Box
          sx={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '12px',
            color: accent,
            letterSpacing: '0.08em',
            opacity: 0.75,
            mb: 0.5,
          }}
        >
          {`// ${codeLabel}`}
        </Box>
      )}

      <Box
        component={motion.div as any}
        role="heading"
        aria-label={title}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: { xs: '28px', sm: '42px' },
          lineHeight: 1,
          display: 'flex',
          width: 'fit-content',
          flexWrap: 'wrap',
          background: `linear-gradient(135deg, ${theme.palette.text.primary} 40%, ${accent} 65%, ${theme.palette.text.primary} 90%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% auto',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% center' },
            '100%': { backgroundPosition: '-200% center' },
          },
          animation: 'shimmer 5s linear infinite',
        }}
      >
        {letters.map((char, i) => (
          <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Box>

      <AccentWrapper>
        <AccentDot />
        <AccentLine />
      </AccentWrapper>
    </Box>
  );
};

export default SectionHeader;
