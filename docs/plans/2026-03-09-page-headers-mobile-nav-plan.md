# Page Hero Banners & Mobile Nav Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a cohesive code-aesthetic hero banner to all page headers, and replace the MUI Drawer mobile nav with a full-screen Framer Motion overlay.

**Architecture:** A new reusable `PageHeroBanner` component (binary rain + orbs + staggered shimmer title + code comment label) replaces the existing banner image headers on Portfolio, Contact, Blog, and BlogDetail pages. `SectionHeader` gets a lighter upgrade (code comment label + shimmer) for in-page use. The mobile nav becomes a custom Framer Motion full-screen overlay with a morphing hamburger.

**Tech Stack:** React, TypeScript, Framer Motion, MUI styled components, emotion keyframes, HTML5 Canvas (BinaryRain reuse)

---

## Context / Key Files

- `src/shared/components/BinaryRain.tsx` — canvas animation; needs banner variant
- `src/shared/components/GradientBackground.tsx` — animated orbs; banner needs static orbs (no parallax)
- `src/pages/Home.tsx` — reference for shimmer + staggered letter patterns to copy
- `src/shared/components/PageHeroBanner.tsx` — **create new**
- `src/pages/Portfolio.tsx` — replace `SplashContainer` + `ImageText` with `PageHeroBanner`
- `src/pages/Contact.tsx` — same as Portfolio
- `src/pages/blog/blog.tsx` — same as Portfolio
- `src/pages/blog/BlogTemplate.tsx` — add `PageHeroBanner` for post title header
- `src/shared/components/sectionHeader.tsx` — add code comment + shimmer
- `src/components/Navbar.tsx` — replace MUI Drawer with custom overlay
- `src/shared/config/navItems.ts` — already has nav data, no changes needed
- `src/shared/components/__tests__/` — test files go here

---

## Task 1: Add `variant` prop to `BinaryRain`

**Files:**
- Modify: `src/shared/components/BinaryRain.tsx`

**Step 1: Add the prop interface and update the component signature**

In `BinaryRain.tsx`, replace:
```tsx
const BinaryRain = () => {
```
with:
```tsx
interface BinaryRainProps {
  variant?: 'default' | 'banner';
}

const BinaryRain = ({ variant = 'default' }: BinaryRainProps) => {
```

**Step 2: Make `CanvasWrapper` dynamic**

Replace the static `CanvasWrapper` styled component:
```tsx
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
```
with:
```tsx
const CanvasWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'default' | 'banner' }>(({ variant }) =>
  variant === 'banner'
    ? {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        zIndex: 1,
        pointerEvents: 'none',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)',
      }
);
```

**Step 3: Pass `variant` to `CanvasWrapper` in the return**

```tsx
return (
  <CanvasWrapper variant={variant}>
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
  </CanvasWrapper>
);
```

**Step 4: Verify the splash page still looks the same**

Open `http://localhost:3000` — the home page binary rain should be unchanged.

**Step 5: Commit**
```bash
git add src/shared/components/BinaryRain.tsx
git commit -m "feat: add banner variant to BinaryRain for full-height coverage"
```

---

## Task 2: Create `PageHeroBanner` component

**Files:**
- Create: `src/shared/components/PageHeroBanner.tsx`
- Create: `src/shared/components/__tests__/PageHeroBanner.test.tsx`

**Step 1: Write the failing test**

```tsx
// src/shared/components/__tests__/PageHeroBanner.test.tsx
import { render, screen } from '../../../shared/test-utils';
import PageHeroBanner from '../PageHeroBanner';

describe('PageHeroBanner', () => {
  it('renders the title text', () => {
    render(<PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />);
    // Each letter is a separate span — check the full text via aria
    expect(screen.getByRole('heading', { name: /portfolio/i })).toBeInTheDocument();
  });

  it('renders the code comment label', () => {
    render(<PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />);
    expect(screen.getByText('// pages/portfolio.tsx')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(
      <PageHeroBanner
        title="Blog"
        filePath="pages/blog/blog.tsx"
        subtitle="Read my latest posts"
      />
    );
    expect(screen.getByText('Read my latest posts')).toBeInTheDocument();
  });
});
```

**Step 2: Run to confirm failure**
```bash
npx react-scripts test --testPathPattern=PageHeroBanner --watchAll=false
```
Expected: FAIL (component doesn't exist yet)

**Step 3: Create the component**

```tsx
// src/shared/components/PageHeroBanner.tsx
import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import BinaryRain from './BinaryRain';

interface PageHeroBannerProps {
  title: string;
  filePath: string;
  subtitle?: string;
}

const BannerContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 320,
  backgroundColor: '#07070f',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: '2rem',
  paddingRight: '2rem',
});

// Static orb — no parallax, just autonomous drift
const Orb = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.22,
  background: color,
  pointerEvents: 'none',
}));

const BannerContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

// Wraps the binary rain at reduced opacity
const RainOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.18,
  zIndex: 1,
  pointerEvents: 'none',
});

const BottomDivider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  background: `linear-gradient(to right, ${theme.palette.custom.orangePalette.background}, transparent)`,
  zIndex: 3,
}));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
};

const PageHeroBanner = ({ title, filePath, subtitle }: PageHeroBannerProps) => {
  const theme = useTheme();
  const { orb1, orb2 } = theme.palette.custom.splash;
  const accent = theme.palette.custom.orangePalette.background;

  const letters = useMemo(() => title.split(''), [title]);

  return (
    <BannerContainer>
      {/* Binary rain at reduced opacity */}
      <RainOverlay>
        <BinaryRain variant="banner" />
      </RainOverlay>

      {/* Static orbs — top-left and bottom-right */}
      <Orb
        color={orb1}
        style={{ width: 400, height: 400, top: '-30%', left: '-8%' }}
        animate={{ x: [0, 30, -15, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Orb
        color={orb2}
        style={{ width: 300, height: 300, bottom: '-40%', right: '-5%' }}
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -8, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <BannerContent>
        {/* Code comment label */}
        <Typography
          sx={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '13px',
            color: accent,
            letterSpacing: '0.08em',
            mb: 1,
            opacity: 0.85,
          }}
        >
          {`// ${filePath}`}
        </Typography>

        {/* Staggered shimmer title */}
        <Box
          component={motion.h1}
          role="heading"
          aria-label={title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '200% center' },
              '100%': { backgroundPosition: '-200% center' },
            },
            animation: 'shimmer 4s linear infinite',
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

      <BottomDivider />
    </BannerContainer>
  );
};

export default PageHeroBanner;
```

**Step 4: Run tests to confirm pass**
```bash
npx react-scripts test --testPathPattern=PageHeroBanner --watchAll=false
```
Expected: PASS (3 tests)

**Step 5: Commit**
```bash
git add src/shared/components/PageHeroBanner.tsx src/shared/components/__tests__/PageHeroBanner.test.tsx
git commit -m "feat: create PageHeroBanner with binary rain, orbs, shimmer title, code label"
```

---

## Task 3: Replace header in `Portfolio.tsx`

**Files:**
- Modify: `src/pages/Portfolio.tsx`

**Step 1: Update the file**

Replace the entire file contents:
```tsx
import { Box } from '@mui/material';
import Projects from '../shared/components/projects';
import About from '../shared/components/about';
import PageHeroBanner from '../shared/components/PageHeroBanner';

const Portfolio = () => {
  return (
    <Box>
      <PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />
      <About />
      <Projects />
    </Box>
  );
};

export default Portfolio;
```

**Step 2: Verify visually**

Open `http://localhost:3000/portfolio` — should see the new banner (dark background, binary rain at top, shimmer "Portfolio" title with code label) instead of the old banner image.

**Step 3: Commit**
```bash
git add src/pages/Portfolio.tsx
git commit -m "feat: replace portfolio banner image with PageHeroBanner"
```

---

## Task 4: Replace header in `Contact.tsx`

**Files:**
- Modify: `src/pages/Contact.tsx`

**Step 1: Update the file**

```tsx
import { Box } from '@mui/material';
import ContactForm from '../shared/components/contactForm';
import PageHeroBanner from '../shared/components/PageHeroBanner';

const Contact = () => {
  return (
    <Box>
      <PageHeroBanner title="Contact" filePath="pages/contact.tsx" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
```

**Step 2: Verify visually**

Open `http://localhost:3000/contact` — same banner treatment.

**Step 3: Commit**
```bash
git add src/pages/Contact.tsx
git commit -m "feat: replace contact banner image with PageHeroBanner"
```

---

## Task 5: Replace header in `blog.tsx`

**Files:**
- Modify: `src/pages/blog/blog.tsx`

**Step 1: Update the file**

```tsx
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blogPosts } from '../../shared/constants/constants';
import BlogPostCard from './blogPostcard';
import BlogDetail from './blogDetail';
import PageHeroBanner from '../../shared/components/PageHeroBanner';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const blogPostsArray = [blogPosts];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PageHeroBanner
        title="Blog"
        filePath="pages/blog/blog.tsx"
        subtitle="Read my latest posts"
      />
      <StyledContainer>
        {selectedPost ? (
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <Grid container spacing={2}>
            {blogPostsArray.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <BlogPostCard post={post} onClick={() => setSelectedPost(post)} />
              </Grid>
            ))}
          </Grid>
        )}
      </StyledContainer>
    </Box>
  );
}
```

Note: `blogText` import is removed since `subtitle` prop replaces the `SectionHeader`.

**Step 2: Verify visually**

Open `http://localhost:3000/blog`.

**Step 3: Commit**
```bash
git add src/pages/blog/blog.tsx
git commit -m "feat: replace blog banner image with PageHeroBanner"
```

---

## Task 6: Add `PageHeroBanner` to `BlogTemplate`

Blog detail view currently has no page-level banner at all — just a chip + h3 title.

**Files:**
- Modify: `src/pages/blog/BlogTemplate.tsx`

**Step 1: Update the file**

```tsx
import * as React from 'react';
import { Box, Avatar, Chip } from '@mui/material';
import { Typography } from '@mui/material';
import PageHeroBanner from '../../shared/components/PageHeroBanner';

export interface BlogMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogTemplateProps {
  title: string;
  date: string;
  tag: string;
  authors: BlogAuthor[];
  media?: BlogMedia[];
  children: React.ReactNode;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title,
  date,
  tag,
  authors,
  media = [],
  children,
}) => {
  return (
    <Box>
      <PageHeroBanner title={title} filePath="pages/blog/post.tsx" />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, mt: 2 }}>
        <Chip label={tag} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {authors.map((author, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={author.avatar} alt={author.name} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2">{author.name}</Typography>
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            {date}
          </Typography>
        </Box>
        {media.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {media.map((item, idx) =>
              item.type === 'image' ? (
                <img
                  key={idx}
                  src={item.src}
                  alt={item.alt || ''}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              ) : (
                <video
                  key={idx}
                  src={item.src}
                  controls
                  style={{ width: '100%', borderRadius: 8 }}
                />
              )
            )}
          </Box>
        )}
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BlogTemplate;
```

**Step 2: Verify**

Click into a blog post — should see the post title rendered in the PageHeroBanner.

**Step 3: Commit**
```bash
git add src/pages/blog/BlogTemplate.tsx
git commit -m "feat: add PageHeroBanner to blog post detail template"
```

---

## Task 7: Upgrade `SectionHeader` with code-comment label + shimmer

The in-page `SectionHeader` (used in About and Projects sections on the Home page) gets a lighter upgrade — no binary rain, but adds the code comment label and shimmer text effect to match the new aesthetic.

**Files:**
- Modify: `src/shared/components/sectionHeader.tsx`
- Read existing: check current props/structure first

**Step 1: Read the current file**

```
src/shared/components/sectionHeader.tsx
```

**Step 2: Update the component**

Replace the file contents with:
```tsx
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  codeLabel?: string;
  sx?: object;
}

const HeaderWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
});

const Accent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingLeft: theme.spacing(1),
  marginTop: 8,
}));

const AccentDot = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.custom.orangePalette.background,
  flexShrink: 0,
}));

const AccentLine = styled(Box)(({ theme }) => ({
  width: 150,
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
    <HeaderWrapper sx={sx}>
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
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: '42px',
          display: 'inline-flex',
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

      <Accent>
        <AccentDot />
        <AccentLine />
      </Accent>
    </HeaderWrapper>
  );
};

export default SectionHeader;
```

**Step 3: Verify**

On `http://localhost:3000`, scroll to the Projects and About sections — titles should now shimmer and animate in on scroll.

**Step 4: Commit**
```bash
git add src/shared/components/sectionHeader.tsx
git commit -m "feat: upgrade SectionHeader with shimmer title and optional code comment label"
```

---

## Task 8: Create `AnimatedHamburger` component

A self-contained hamburger button that morphs to an X.

**Files:**
- Create: `src/components/AnimatedHamburger.tsx`

**Step 1: Create the component**

```tsx
// src/components/AnimatedHamburger.tsx
import { Box, IconButton } from '@mui/material';

interface AnimatedHamburgerProps {
  open: boolean;
  onClick: () => void;
  color?: string;
}

const BAR_STYLE = {
  display: 'block',
  width: 24,
  height: 2,
  borderRadius: 2,
  transformOrigin: 'center',
  transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease',
};

const AnimatedHamburger = ({ open, onClick, color = 'currentColor' }: AnimatedHamburgerProps) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      size="large"
      sx={{ ml: 'auto', p: 1, color }}
    >
      <Box sx={{ width: 24, height: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top bar */}
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
          }}
        />
        {/* Middle bar */}
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'none',
          }}
        />
        {/* Bottom bar */}
        <Box
          component="span"
          sx={{
            ...BAR_STYLE,
            backgroundColor: color,
            transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
          }}
        />
      </Box>
    </IconButton>
  );
};

export default AnimatedHamburger;
```

**Step 2: Commit**
```bash
git add src/components/AnimatedHamburger.tsx
git commit -m "feat: add AnimatedHamburger component with CSS bar morphing"
```

---

## Task 9: Create `MobileNavOverlay` component

**Files:**
- Create: `src/components/MobileNavOverlay.tsx`
- Create: `src/components/__tests__/MobileNavOverlay.test.tsx`

**Step 1: Write the failing test**

```tsx
// src/components/__tests__/MobileNavOverlay.test.tsx
import { render, screen, fireEvent } from '../../shared/test-utils';
import MobileNavOverlay from '../MobileNavOverlay';
import { NAV_ITEMS } from '../../shared/config/navItems';

const mockProps = {
  open: true,
  onClose: jest.fn(),
  onThemeChange: jest.fn(),
  isDarkMode: true,
  selectedRoute: '/',
};

describe('MobileNavOverlay', () => {
  it('renders nav links when open', () => {
    render(<MobileNavOverlay {...mockProps} />);
    NAV_ITEMS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('does not render when closed', () => {
    render(<MobileNavOverlay {...mockProps} open={false} />);
    expect(screen.queryByText(NAV_ITEMS[0].label)).not.toBeInTheDocument();
  });

  it('calls onClose when a nav link is clicked', () => {
    render(<MobileNavOverlay {...mockProps} />);
    fireEvent.click(screen.getByText(NAV_ITEMS[1].label));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
```

**Step 2: Run to confirm failure**
```bash
npx react-scripts test --testPathPattern=MobileNavOverlay --watchAll=false
```
Expected: FAIL

**Step 3: Create the component**

```tsx
// src/components/MobileNavOverlay.tsx
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NAV_ITEMS } from '../shared/config/navItems';
import BinaryRain from '../shared/components/BinaryRain';

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
  onThemeChange: () => void;
  isDarkMode: boolean;
  selectedRoute: string;
}

// Static orb for atmosphere
const Orb = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.15,
  pointerEvents: 'none',
});

const RainOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  opacity: 0.08,
  pointerEvents: 'none',
  zIndex: 0,
});

const overlayVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
};

const MobileNavOverlay = ({
  open,
  onClose,
  onThemeChange,
  isDarkMode,
  selectedRoute,
}: MobileNavOverlayProps) => {
  const theme = useTheme();
  const { orb1 } = theme.palette.custom.splash;
  const accent = theme.palette.custom.orangePalette.background;

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#07070f',
            zIndex: (t: any) => t.zIndex.appBar + 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pl: 4,
            overflow: 'hidden',
          }}
        >
          {/* Atmosphere */}
          <RainOverlay>
            <BinaryRain variant="banner" />
          </RainOverlay>
          <Orb
            style={{ width: 350, height: 350, top: '-15%', right: '-10%', background: orb1 }}
            animate={{ x: [0, 20, -10, 0], y: [0, 15, -8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Nav links */}
          <Box
            component={motion.nav}
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            sx={{ position: 'relative', zIndex: 2, width: '100%' }}
          >
            {NAV_ITEMS.map(({ path, label }) => {
              const isActive = selectedRoute === path;
              return (
                <motion.div key={path} variants={linkVariants}>
                  <Box
                    component={Link}
                    to={path}
                    onClick={onClose}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      mb: 2,
                      position: 'relative',
                      width: 'fit-content',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        height: 2,
                        width: '100%',
                        background: accent,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: { xs: '44px', sm: '56px' },
                        color: isActive ? accent : 'rgba(255,255,255,0.92)',
                        lineHeight: 1.1,
                        transition: 'color 0.2s',
                        '&:hover': { color: accent },
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </motion.div>
              );
            })}

            {/* Theme toggle */}
            <motion.div variants={linkVariants}>
              <IconButton
                onClick={onThemeChange}
                aria-label="Change theme"
                sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, ml: -1 }}
              >
                {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default MobileNavOverlay;
```

**Step 4: Run tests**
```bash
npx react-scripts test --testPathPattern=MobileNavOverlay --watchAll=false
```
Expected: PASS (3 tests)

**Step 5: Commit**
```bash
git add src/components/MobileNavOverlay.tsx src/components/__tests__/MobileNavOverlay.test.tsx
git commit -m "feat: create MobileNavOverlay full-screen animated nav with framer-motion"
```

---

## Task 10: Wire up new mobile nav in `Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Replace the mobile section**

Remove these imports:
```tsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
```

Add new imports (keep the rest):
```tsx
import AnimatedHamburger from './AnimatedHamburger';
import MobileNavOverlay from './MobileNavOverlay';
```

**Step 2: Replace the mobile hamburger button in the Toolbar**

Remove:
```tsx
{isMobile && (
  <IconButton
    onClick={toggleDrawer(true)}
    aria-label="menu"
    size="large"
    sx={{
      marginLeft: 'auto',
      p: 1,
      '& svg': {
        transition: 'transform .25s ease',
        transform: drawerOpen ? 'rotate(90deg) scale(1.05)' : 'none',
      },
    }}
  >
    {drawerOpen ? <CloseIcon /> : <MenuIcon />}
  </IconButton>
)}
```

Add:
```tsx
{isMobile && (
  <AnimatedHamburger
    open={drawerOpen}
    onClick={() => setDrawerOpen((prev) => !prev)}
    color={theme.palette.text.primary}
  />
)}
```

**Step 3: Replace the entire `<Drawer>` block**

Remove everything from `{/* DRAWER */}` through `</Drawer>`.

Add after the `<AppBarContainer>` closing tag:
```tsx
<MobileNavOverlay
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  onThemeChange={onThemeChange}
  isDarkMode={isDarkMode}
  selectedRoute={selectedRoute}
/>
```

**Step 4: Clean up unused MUI imports**

Remove `Drawer, List, ListItem, ListItemButton, ListItemText, CloseIcon, MenuIcon` from the import list if not used elsewhere in the file.

**Step 5: Verify on mobile viewport**

In Chrome DevTools, switch to a mobile viewport (<600px). The hamburger button should appear. Click it — the full-screen overlay should animate in with staggered links. Click a link — overlay closes and navigates.

**Step 6: Run all tests**
```bash
npx react-scripts test --watchAll=false
```
Expected: All existing tests + new tests pass.

**Step 7: Commit**
```bash
git add src/components/Navbar.tsx
git commit -m "feat: replace MUI Drawer mobile nav with full-screen framer-motion overlay"
```

---

## Task 11: Push to origin/develop

```bash
git push origin develop
```

Verify at `http://localhost:3000` across all routes:
- `/` — home page unchanged
- `/portfolio` — new dark hero banner
- `/contact` — new dark hero banner
- `/blog` — new dark hero banner, click into a post for blog template banner
- Mobile viewport — animated hamburger + full-screen nav overlay with staggered links

---

## Notes / Gotchas

- `BinaryRain` in banner mode covers `inset: 0` but the canvas sizing uses `ResizeObserver`, so it will correctly resize to the parent container's dimensions.
- The shimmer `@keyframes` defined in an emotion `sx` prop is scoped to the component — no conflict with the global `shimmer` animation in `Home.tsx`.
- `AnimatePresence` in `MobileNavOverlay` must wrap the conditional render (the `{open && ...}` block) for exit animations to work.
- `MobileNavOverlay` renders at `zIndex: appBar + 10` so it covers the AppBar — make sure the hamburger button remains clickable by keeping it outside the overlay's z-index stack (it lives in the AppBar which has `zIndex: appBar`).
- The `toggleDrawer` helper in `Navbar.tsx` returns a function — replace usages with direct `setDrawerOpen` calls for clarity.
