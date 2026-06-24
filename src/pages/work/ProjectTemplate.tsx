import * as React from 'react';
import { useEffect } from 'react';
import { Box, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player/youtube';
import PageHeroBanner from '../../shared/components/PageHeroBanner';
import SectionHeader from '../../shared/components/sectionHeader';
import { ProjectData } from '../../data/projectData';
import { useAppLoad } from '../../context/AppLoadContext';

const AnimationContainer = styled(Box)({
  animation: 'fadeIn 1s',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

const SectionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '2rem',
  width: '94%',
  margin: '4rem auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: 'auto',
    margin: '1.5rem',
  },
}));

const ImageContainer = styled(Box)({
  flex: 1,
});

const TextContainer = styled(Box)({
  flex: 1,
});

const BodyText = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  lineHeight: 1.8,
  margin: '1rem',
});

const BulletText = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '16px',
});

const ProjectImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
  },
});

type ProjectTemplateProps = ProjectData;

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  title,
  subtitle,
  heroImage,
  videoUrl,
  overviewBullets,
  sections,
  closingText,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setAppReady } = useAppLoad();
  useEffect(() => { setAppReady(); }, [setAppReady]);

  const expandImage = (src?: string) => {
    if (src) window.open(src, '_blank');
  };

  const hasHeroMedia = !!(heroImage || videoUrl);

  return (
    <AnimationContainer>
      <PageHeroBanner
        title={title}
        filePath={`pages/projects/${title.toLowerCase().replace(/\s+/g, '-')}.tsx`}
        subtitle={subtitle}
      />

      {/* ── Overview section ───────────────────────────────────────── */}
      <SectionRow>
        {/* Hero media — LEFT */}
        {hasHeroMedia && (
          <ImageContainer>
            {videoUrl ? (
              <ReactPlayer url={videoUrl} width="100%" />
            ) : (
              <ProjectImage
                src={heroImage}
                alt={title}
                loading="lazy"
                onClick={() => expandImage(heroImage)}
              />
            )}
          </ImageContainer>
        )}

        {/* Overview bullets — RIGHT */}
        <TextContainer>
          <SectionHeader title={subtitle} />
          <List sx={{ pl: 4, listStyleType: 'disc' }}>
            {overviewBullets.map((item, idx) => (
              <ListItem key={idx} sx={{ display: 'list-item', pl: 2 }}>
                <BulletText dangerouslySetInnerHTML={{ __html: item }} />
              </ListItem>
            ))}
          </List>
        </TextContainer>
      </SectionRow>

      {/* ── Additional sections (alternating layout) ───────────────── */}
      {sections?.map((section, idx) => {
        // sections[0] → image RIGHT, sections[1] → image LEFT, etc.
        const imageOnLeft = idx % 2 !== 0;
        const hasMedia = !!(section.image || section.videoUrl);

        const textBlock = (
          <TextContainer>
            {section.title && <SectionHeader title={section.title} />}
            {Array.isArray(section.body) ? (
              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {section.body.map((item, i) => (
                  <ListItem key={i} sx={{ display: 'list-item', pl: 2 }}>
                    <BulletText
                      sx={{ fontSize: '14px' }}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <BodyText>{section.body}</BodyText>
            )}
          </TextContainer>
        );

        const mediaBlock = hasMedia ? (
          <ImageContainer>
            {section.videoUrl ? (
              <ReactPlayer url={section.videoUrl} width="100%" />
            ) : (
              <ProjectImage
                src={section.image}
                alt={section.imageAlt || section.title || ''}
                loading="lazy"
                onClick={() => expandImage(section.image)}
              />
            )}
          </ImageContainer>
        ) : null;

        // When no image, render text full-width
        if (!hasMedia) {
          return (
            <Box key={idx} sx={{ width: '94%', margin: isMobile ? '1.5rem auto' : '3rem auto' }}>
              {textBlock}
            </Box>
          );
        }

        return (
          <SectionRow key={idx}>
            {imageOnLeft ? (
              <>
                {mediaBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {mediaBlock}
              </>
            )}
          </SectionRow>
        );
      })}

      {/* ── Closing paragraph ──────────────────────────────────────── */}
      {closingText && (
        <Box sx={{ width: '94%', margin: isMobile ? '1.5rem auto' : '3rem auto' }}>
          <BodyText sx={{ m: '1rem' }}>{closingText}</BodyText>
        </Box>
      )}
    </AnimationContainer>
  );
};

export default ProjectTemplate;
