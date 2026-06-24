import { useEffect } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import ReactPlayer from 'react-player/youtube';
import PageHeroBanner from '../../shared/components/PageHeroBanner';
import SectionHeader from '../../shared/components/sectionHeader';
import { useAppLoad } from '../../context/AppLoadContext';
import {
  AnimationContainer,
  Section,
  SectionMobile,
  ImageContainer,
  TextContainer,
  DescriptionContainer,
  ListContainer,
} from '../../shared/styles/templateStyles';

interface WorkTemplateProps {
  title: string;
  title2: string;
  description: string[];
  images: string[];
  videoHeaderUrl?: string;
  titleSection2?: string;
  descriptionSection2?: string[];
  titleSection3?: string;
  descriptionSection3?: string[];
  titleSection4?: string;
  descriptionSection4?: string[];
  titleSection5?: string;
  descriptionSectionFull?: string[];
}

const renderMedia = (src: string, alt: string) =>
  src.endsWith('.webm') ? (
    <video src={src} autoPlay muted loop playsInline style={{ width: '100%', height: 'auto' }} />
  ) : (
    <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} loading="lazy" />
  );

const WorkTemplate = ({ title, title2, description, images, videoHeaderUrl, titleSection2, descriptionSection2, titleSection3, descriptionSection3, titleSection4, descriptionSection4, descriptionSectionFull }: WorkTemplateProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setAppReady } = useAppLoad();
  useEffect(() => { setAppReady(); }, [setAppReady]);

  const expandImage = (image?: string) => {
    if (!image?.endsWith('.webm')) window.open(image, '_blank');
  }

  return (
    <AnimationContainer>
      <PageHeroBanner
        title={title}
        filePath={`pages/work/${title.toLowerCase().replace(/\s+/g, '-')}.tsx`}
        subtitle={title2}
      />
      {!isMobile ? (
        <Box>
          <Section>
            <ImageContainer>
              {!videoHeaderUrl ? (
                images[0] ? renderMedia(images[0], `${title} screenshot`) : null
              ) : (
                <ReactPlayer url={videoHeaderUrl} />
              )}
            </ImageContainer>
            <TextContainer>
              <SectionHeader title={title2} />
              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {description.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <ListContainer dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>
            </TextContainer>
          </Section>

          {(titleSection2 || descriptionSection2) && (
            <Section>
              <TextContainer>
                {titleSection2 && <SectionHeader title={titleSection2} />}
                <DescriptionContainer>{descriptionSection2}</DescriptionContainer>
              </TextContainer>
              {images[1] ? (
                <ImageContainer onClick={() => expandImage(images[1])}>
                  {renderMedia(images[1], `${title} screenshot`)}
                </ImageContainer>
              ) : null}
            </Section>
          )}

          {(titleSection3 || descriptionSection3) && (
            <Section>
              <ImageContainer>
                {images[2] && <Box onClick={() => expandImage(images[2])}>{renderMedia(images[2], `${title} screenshot`)}</Box>}
              </ImageContainer>
              <TextContainer>
                {titleSection3 && <SectionHeader title={titleSection3} />}
                <DescriptionContainer>{descriptionSection3}</DescriptionContainer>
              </TextContainer>
            </Section>
          )}

          {(titleSection4 || descriptionSection4) && (
            <Section>
              <TextContainer>
                {titleSection4 && <SectionHeader title={titleSection4} />}
                <DescriptionContainer>{descriptionSection4}</DescriptionContainer>
              </TextContainer>
              {images[3] ? (
                <ImageContainer onClick={() => expandImage(images[3])}>
                  {renderMedia(images[3], `${title} screenshot`)}
                </ImageContainer>
              ) : null}
            </Section>
          )}

          {descriptionSectionFull && (
            <Section>
              <TextContainer>
                <DescriptionContainer>{descriptionSectionFull}</DescriptionContainer>
              </TextContainer>
            </Section>
          )}

          {images[5] ? (
            <ImageContainer onClick={() => expandImage(images[5])}>
              {renderMedia(images[5], `${title} screenshot`)}
            </ImageContainer>
          ) : null}
        </Box>
      ) : (
        <Box>
          <SectionMobile>
            <ImageContainer>
              {!videoHeaderUrl ? (
                images[0] ? renderMedia(images[0], `${title} screenshot`) : null
              ) : (
                <ReactPlayer width='100%' height='auto' url={videoHeaderUrl} />
              )}
            </ImageContainer>
            <TextContainer>
              <SectionHeader title={title2} />
              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {description.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <ListContainer dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>
            </TextContainer>
          </SectionMobile>

          {titleSection2 && descriptionSection2 ? (
            <SectionMobile>
              <TextContainer>
                <SectionHeader title={titleSection2} />
                <DescriptionContainer>{descriptionSection2}</DescriptionContainer>
              </TextContainer>
              {images[1] && (
                <ImageContainer onClick={() => expandImage(images[1])}>
                  {renderMedia(images[1], `${title} more`)}
                </ImageContainer>
              )}
            </SectionMobile>
          ) : null}

          {titleSection3 && descriptionSection3 ? (
            <SectionMobile>
              <TextContainer>
                <SectionHeader title={titleSection3} />
                <DescriptionContainer>{descriptionSection3}</DescriptionContainer>
                {images[2] && (
                  <ImageContainer onClick={() => expandImage(images[2])}>
                    {renderMedia(images[2], `${title} screenshot`)}
                  </ImageContainer>
                )}
              </TextContainer>
            </SectionMobile>
          ) : null}
        </Box>
      )}
    </AnimationContainer>
  );
};

export default WorkTemplate;
