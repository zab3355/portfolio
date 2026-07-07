import * as React from 'react';
import { useEffect } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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

interface OrderedProps {
  imageOnLeft: boolean;
}

const shouldForwardProp = (prop: PropertyKey) => prop !== 'imageOnLeft';

const SectionImageContainer = styled(ImageContainer, { shouldForwardProp })<OrderedProps>(
  ({ theme, imageOnLeft }) => ({
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: imageOnLeft ? 0 : 1,
    },
  })
);

const SectionTextContainer = styled(TextContainer, { shouldForwardProp })<OrderedProps>(
  ({ theme, imageOnLeft }) => ({
    order: 0,
    [theme.breakpoints.up('sm')]: {
      order: imageOnLeft ? 1 : 0,
    },
  })
);

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

const SmallBulletText = styled(BulletText)({
  fontSize: '14px',
});

const FullWidthSection = styled(Box)(({ theme }) => ({
  width: '94%',
  margin: '3rem auto',
  [theme.breakpoints.down('sm')]: {
    margin: '1.5rem auto',
  },
}));

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

interface SectionBodyContentProps {
  body: string | string[];
}

const SectionBodyContent = ({ body }: SectionBodyContentProps) => {
  if (Array.isArray(body)) {
    return (
      <List sx={{ pl: 4, listStyleType: 'disc' }}>
        {body.map((item, i) => (
          <ListItem key={i} sx={{ display: 'list-item', pl: 2 }}>
            <SmallBulletText dangerouslySetInnerHTML={{ __html: item }} />
          </ListItem>
        ))}
      </List>
    );
  }
  return <BodyText>{body}</BodyText>;
};

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

      <SectionRow>
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

      {sections?.map((section, idx) => {
        const imageOnLeft = idx % 2 !== 0;
        const hasMedia = !!(section.image || section.videoUrl);

        const textBlock = (
          <SectionTextContainer imageOnLeft={imageOnLeft}>
            {section.title && <SectionHeader title={section.title} />}
            <SectionBodyContent body={section.body} />
          </SectionTextContainer>
        );

        const mediaBlock = hasMedia ? (
          <SectionImageContainer imageOnLeft={imageOnLeft}>
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
          </SectionImageContainer>
        ) : null;

        if (!hasMedia) {
          return (
            <FullWidthSection key={idx}>
              {textBlock}
            </FullWidthSection>
          );
        }

        return (
          <SectionRow key={idx}>
            {textBlock}
            {mediaBlock}
          </SectionRow>
        );
      })}

      {closingText && (
        <FullWidthSection>
          <BodyText>{closingText}</BodyText>
        </FullWidthSection>
      )}
    </AnimationContainer>
  );
};

export default ProjectTemplate;
