# Splash Page Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static Boston photo splash with an animated gradient-orb night-sky + binary rain background, add a spring-physics custom cursor, staggered entrance text, and refactor Home/About/Projects for theme-awareness and React best practices.

**Architecture:** Three new self-contained components (GradientBackground, BinaryRain, CustomCursor) are composed in Home.tsx. About and Projects are refactored in place — no new abstractions, just fixing what's already there. Theme tokens for splash colors live in both theme files + palette type augmentation.

**Tech Stack:** React 19, framer-motion v11, MUI v6, TypeScript, CSS animations, HTML Canvas

---

### Task 1: Add `splash` palette tokens to themes

**Files:**
- Modify: `src/shared/types/palette.tsx`
- Modify: `src/shared/styles/darkTheme.tsx`
- Modify: `src/shared/styles/lightTheme.tsx`

**Step 1: Add `splash` to the Palette and PaletteOptions interfaces in `src/shared/types/palette.tsx`**

Add inside `interface Palette { custom: { ... } }` after the `base` block:
```ts
      splash: {
        background: string;
        orb1: string;
        orb2: string;
        orb3: string;
        binaryColor: string;
      };
```

Add the same block inside `interface PaletteOptions { custom?: { ... } }` after the `base` block (all fields optional):
```ts
      splash?: {
        background?: string;
        orb1?: string;
        orb2?: string;
        orb3?: string;
        binaryColor?: string;
      };
```

**Step 2: Add `splash` tokens to `src/shared/styles/darkTheme.tsx`**

Import `indigo`, `purple` from `'@mui/material/colors'` (add to existing import).

Add inside the `custom` object after `base`:
```ts
      splash: {
        background: '#07070f',
        orb1: deepOrange[700],
        orb2: indigo[900],
        orb3: purple[900],
        binaryColor: deepOrange[400],
      },
```

**Step 3: Add `splash` tokens to `src/shared/styles/lightTheme.tsx`**

Import `indigo`, `purple` from `'@mui/material/colors'` (add to existing import).

Add inside the `custom` object after `base`:
```ts
      splash: {
        background: '#1a1a2e',
        orb1: deepOrange[400],
        orb2: indigo[700],
        orb3: purple[700],
        binaryColor: deepOrange[300],
      },
```

Note: Both themes keep a dark splash background — the gradient orbs provide the difference. The splash is always full-bleed dark for visual impact.

**Step 4: Commit**
```bash
git add src/shared/types/palette.tsx src/shared/styles/darkTheme.tsx src/shared/styles/lightTheme.tsx
git commit -m "feat: add splash palette tokens to theme system"
```

---

### Task 2: Create GradientBackground component

**Files:**
- Create: `src/shared/components/GradientBackground.tsx`

**Step 1: Create the file**

```tsx
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Wrapper = styled(Box)({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
});

interface OrbProps {
  color: string;
}

const Orb = styled(motion.div)<OrbProps>(({ color }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(120px)',
  opacity: 0.45,
  background: color,
  pointerEvents: 'none',
}));

const GradientBackground = () => {
  const theme = useTheme();
  const { orb1, orb2, orb3 } = theme.palette.custom.splash;

  return (
    <Wrapper>
      {/* Orb 1 – brand orange, top-left drift */}
      <Orb
        color={orb1}
        style={{ width: 600, height: 600, top: '-10%', left: '-10%' }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Orb 2 – indigo, top-right */}
      <Orb
        color={orb2}
        style={{ width: 500, height: 500, top: '-5%', right: '-5%' }}
        animate={{ x: [0, -60, 30, 0], y: [0, 80, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Orb 3 – purple, center-bottom */}
      <Orb
        color={orb3}
        style={{ width: 400, height: 400, bottom: '15%', left: '35%' }}
        animate={{ x: [0, 40, -60, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Wrapper>
  );
};

export default GradientBackground;
```

**Step 2: Commit**
```bash
git add src/shared/components/GradientBackground.tsx
git commit -m "feat: add animated gradient orb background component"
```

---

### Task 3: Create BinaryRain component

**Files:**
- Create: `src/shared/components/BinaryRain.tsx`

**Step 1: Create the file**

This uses a canvas with `requestAnimationFrame`. Columns of 0s and 1s fall downward. A CSS gradient mask fades the top 60% so it only appears at the bottom of the splash and blends into the sky.

```tsx
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const CanvasWrapper = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '55%',
  zIndex: 1,
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
});

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const rainColor = theme.palette.custom.splash.binaryColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 7, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = rainColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        ctx.globalAlpha = Math.random() * 0.6 + 0.2;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };

    const interval = setInterval(draw, 60);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [rainColor]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </CanvasWrapper>
  );
};

export default BinaryRain;
```

**Step 2: Commit**
```bash
git add src/shared/components/BinaryRain.tsx
git commit -m "feat: add binary rain canvas effect component"
```

---

### Task 4: Create CustomCursor component

**Files:**
- Create: `src/shared/components/CustomCursor.tsx`

**Step 1: Create the file**

The cursor hides the native pointer on the splash and renders a 8px dot + 32px ring. The ring uses `useSpring` for lag/spring physics. On hover over `a`, `button` elements it scales down and fills orange.

```tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomCursor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 180, damping: 22 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = () => setIsHovering(true);
    const onLeaveInteractive = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile) return null;

  const accent = theme.palette.custom.orangePalette.background;

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: accent,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — spring-lagged */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 20 : 34,
          height: isHovering ? 20 : 34,
          borderRadius: '50%',
          border: `2px solid ${accent}`,
          backgroundColor: isHovering ? `${accent}33` : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
```

**Step 2: Add global cursor:none to index.css**

In `src/index.css`, add:
```css
* {
  cursor: none;
}
```

Note: This hides the native cursor site-wide. CustomCursor only renders on non-mobile, so mobile users get the default cursor behavior back via the `if (isMobile) return null` guard. To restore native cursor on mobile, add to `index.css`:
```css
@media (max-width: 900px) {
  * {
    cursor: auto;
  }
}
```

**Step 3: Mount CustomCursor in `src/App.tsx`**

Read App.tsx first, then add `<CustomCursor />` as a sibling to the router content (outside all routes so it persists across pages).

**Step 4: Commit**
```bash
git add src/shared/components/CustomCursor.tsx src/index.css src/App.tsx
git commit -m "feat: add spring-physics custom cursor with hover state"
```

---

### Task 5: Refactor Home.tsx — splash redesign

**Files:**
- Modify: `src/pages/Home.tsx`

**Step 1: Replace the entire file content**

Key changes from current:
- Remove Boston photo import and background image styles
- Use `theme.palette.custom.splash.background` for the base color
- Compose `<GradientBackground />` and `<BinaryRain />` inside `SplashContainer`
- Single `<ContentContainer>` for both mobile/desktop using responsive `sx` (no duplicate JSX)
- Staggered letter-by-letter entrance for the name using framer-motion `staggerChildren`
- Gradient shimmer on name text via `background-clip: text`
- Custom typewriter cursor: pass `cursor: '|'` to typewriter options and override via CSS
- Replace ArrowsButton scroll indicator with a minimal vertical line + animated traveling dot

```tsx
import { useCallback, useMemo } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
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

// Vertical scroll indicator — replaces the old ArrowsButton
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
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const accent = theme.palette.custom.orangePalette.background;
  const isDark = theme.palette.mode === 'dark';

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
          {/* Staggered name */}
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

        {/* Scroll indicator — vertical line with traveling dot */}
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
```

**Step 2: Add the shimmer keyframe to `src/index.css`**

```css
@keyframes shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}
```

**Step 3: Commit**
```bash
git add src/pages/Home.tsx src/index.css
git commit -m "feat: redesign splash with gradient orbs, binary rain, staggered text, and scroll indicator"
```

---

### Task 6: Refactor About.tsx

**Files:**
- Modify: `src/shared/components/about.tsx`

Problems to fix:
- Duplicated mobile/desktop JSX blocks (identical content, different wrappers)
- Hardcoded color `#e45447` in inline sx — should use `theme.palette.custom.orangePalette.background`
- Unused `ImageBox` styled component

**Step 1: Replace the file**

```tsx
import { Box, List, ListItem, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import aboutImage from '../../assets/images/about-img.png';
import { aboutText } from '../constants/constants';
import SectionHeader from './sectionHeader';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '2rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  marginRight: '2rem',
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    marginBottom: '1rem',
  },
}));

const TextContainer = styled(Box)({
  flex: 1,
});

const About = () => {
  return (
    <ContentContainer>
      <ImageContainer>
        <img src={aboutImage} alt="Photo of Zach Brown" style={{ width: '100%', borderRadius: '8px' }} />
      </ImageContainer>
      <TextContainer>
        <SectionHeader title={aboutText.heading} />
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
            {aboutText.body}
          </Typography>
          <List sx={{ pl: 4, listStyleType: 'disc' }}>
            {aboutText.expertise.map((item, idx) => (
              <ListItem key={idx} sx={{ display: 'list-item', pl: 2 }}>
                <Typography variant="body1" component="span" dangerouslySetInnerHTML={{ __html: item }} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {aboutText.conclusion}
          </Typography>
        </Box>
      </TextContainer>
    </ContentContainer>
  );
};

export default About;
```

**Step 2: Commit**
```bash
git add src/shared/components/about.tsx
git commit -m "refactor: simplify About component, remove mobile/desktop duplication, fix hardcoded colors"
```

---

### Task 7: Refactor Projects.tsx

**Files:**
- Modify: `src/shared/components/projects.tsx`

Problems to fix:
- `FiltersContainer`, `FilterImage`, `FilterButton` styled components defined **inside** the component body — re-created on every render
- Hardcoded colors: `#f37b24`, `wheat`, `#e45447` — should use theme tokens
- Inline divider (dot + line) duplicated from SectionHeader — use `SectionHeader` instead
- Mobile/desktop split can be simplified with responsive grid

**Step 1: Replace the file**

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { projectText, projectBoxes } from '../constants/constants';
import SectionHeader from './sectionHeader';

// Styled components defined OUTSIDE the component — created once, not on every render

const BoxesContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '3rem',
  padding: '8rem',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    padding: '2rem',
    paddingBottom: '2rem',
  },
}));

const BoxItem = styled(motion.div)({
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  justifySelf: 'center',
  width: 'fit-content',
  border: '2px solid transparent',
  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  '&:hover .project-image': {
    filter: 'brightness(0.5)',
  },
  '&:hover .hover-text': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const HoveredBoxTitle = styled(Typography)(({ theme }) => ({
  bottom: '60px',
  position: 'absolute',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Poppins',
  fontWeight: 700,
  backgroundColor: theme.palette.custom.orangePalette.background,
  padding: '5px',
  zIndex: 99999,
  color: '#fff',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.5s, transform 0.5s',
}));

interface FiltersContainerProps {
  isMobile: boolean;
  accentColor: string;
}

const FiltersContainer = styled(Box)<FiltersContainerProps>(({ isMobile, accentColor }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: accentColor,
  padding: isMobile ? '10px 6px' : '12px 134px',
  borderBottom: '8px solid rgba(255,255,255,0.15)',
  margin: '50px auto',
  width: 'fit-content',
}));

const FilterImage = styled('img')(({ theme }) => ({
  '--color': theme.palette.custom.orangePalette.background,
  '--border': '10px',
  '--offset': '20px',
  '--gap': '5px',
  '--_c': `var(--color) var(--border), #0000 0 calc(100% - var(--border)), var(--color) 0`,
  '--_o': 'calc(3 * var(--offset))',
  padding: `
    calc(var(--gap) + var(--border))
    calc(var(--gap) + var(--border) + var(--offset))
    calc(var(--gap) + var(--border) + var(--offset))
    calc(var(--gap) + var(--border))
  `,
  background: `
    linear-gradient(var(--_c)) var(--_o) var(--_o),
    linear-gradient(90deg, var(--_c)) var(--_o) var(--_o)
  `,
  backgroundSize: 'calc(100% - var(--_o)) calc(100% - var(--_o))',
  backgroundRepeat: 'no-repeat',
  width: '70%',
  transition: '.5s',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundPosition: '0px 0px',
    backgroundSize: 'calc(100% - var(--offset)) calc(100% - var(--offset))',
  },
}));

const FilterButton = styled(Typography)<{ selected: boolean }>(({ theme, selected }) => ({
  color: selected ? theme.palette.custom.base.black : theme.palette.custom.base.white,
  textTransform: 'uppercase',
  margin: '0 50px',
  cursor: 'pointer',
  fontWeight: selected ? 600 : 400,
  '&:hover, &:focus': {
    fontWeight: 500,
  },
}));

const Projects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filter, setFilter] = useState('Work');

  const filteredBoxes = filter === 'All' ? projectBoxes : projectBoxes.filter(box => box.type === filter);

  return (
    <Box>
      <Box sx={{ px: isMobile ? 2 : 8, mt: '80px', mb: '30px' }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: isMobile ? '40px' : '60px',
            mb: 1,
          }}
        >
          {projectText.title}
        </Typography>
        <SectionHeader title="" sx={{ justifyContent: 'center' }} />
      </Box>

      <FiltersContainer isMobile={isMobile} accentColor={theme.palette.custom.orangePalette.background}>
        <FilterButton selected={filter === 'Work'} onClick={() => setFilter('Work')}>Work</FilterButton>
        <FilterButton selected={filter === 'Personal'} onClick={() => setFilter('Personal')}>Personal</FilterButton>
      </FiltersContainer>

      <BoxesContainer>
        {filteredBoxes.map(box => (
          <BoxItem
            key={box.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!isMobile && <HoveredBoxTitle className="hover-text">{box.content}</HoveredBoxTitle>}
            <FilterImage
              className="project-image"
              src={box.imageUrl}
              alt={box.content}
              onClick={() => navigate(box.link)}
            />
          </BoxItem>
        ))}
      </BoxesContainer>
    </Box>
  );
};

export default Projects;
```

**Step 2: Commit**
```bash
git add src/shared/components/projects.tsx
git commit -m "refactor: move styled components outside Projects body, fix hardcoded colors, unify mobile/desktop grid"
```

---

### Task 8: Verify + visual check

**Step 1: Run the dev server**
```bash
yarn start
```

**Step 2: Check each item**
- [ ] Splash background is dark with drifting color orbs (not the Boston photo)
- [ ] Binary rain effect visible at bottom of splash, fading into sky
- [ ] Name "Zachary Brown" animates in letter by letter with gradient shimmer
- [ ] Typewriter loops with `|` cursor in orange
- [ ] Custom cursor dot + ring visible on desktop, hidden on mobile
- [ ] Scroll indicator (vertical line + traveling dot) at bottom center
- [ ] Light theme: orb colors shift (check theme toggle in navbar)
- [ ] Mobile: layout stacks correctly, no layout overflow
- [ ] Projects section: filter buttons work, hover titles appear, grid collapses on mobile
- [ ] About section: image + text side by side on desktop, stacked on mobile

**Step 3: Fix any TypeScript errors shown in console**

Run:
```bash
yarn build 2>&1 | head -60
```

**Step 4: Final commit if any fixes were needed**
```bash
git add -p
git commit -m "fix: resolve any TypeScript or layout issues from splash redesign"
```
