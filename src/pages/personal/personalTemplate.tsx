import { Box, List, ListItem, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import ReactPlayer from 'react-player/youtube';
import PageHeroBanner from '../../shared/components/PageHeroBanner';
import SectionHeader from '../../shared/components/sectionHeader';
import {
  AnimationContainer,
  Section,
  SectionMobile,
  ImageContainer,
  TextContainer,
  DescriptionContainer,
  ListContainer,
} from '../../shared/styles/templateStyles';

interface PersonalTemplateProps {
  title: string;
  title2: string;
  description: string[];
  images: string[];
  videoHeaderUrl?: string;
  titleSection2?: string;
  descriptionSection2?: string[];
  titleSection3?: string;
  descriptionSection3?: string[];
}

const PersonalTemplate =({ title, title2, description, images, videoHeaderUrl, titleSection2, descriptionSection2, titleSection3, descriptionSection3 }: PersonalTemplateProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expandImage = (image?: string) => {
    if (!image?.endsWith('.webm')) window.open(image, '_blank');
  }

  return (
    <AnimationContainer>
      <PageHeroBanner
        title={title}
        filePath={`pages/personal/${title.toLowerCase().replace(/\s+/g, '-')}.tsx`}
        subtitle={title2}
      />
      {!isMobile ? (
        <Box>
          <Section>
            <ImageContainer>
              {!videoHeaderUrl ? (
                images[0] ? (
                  <img src={images[0]} onClick={() => { expandImage(images[0]) }} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
                ) : null
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
                <ImageContainer>
                  <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
                </ImageContainer>
              ) : null}
            </Section>
          )}

          {(titleSection3 || descriptionSection3) && (
            <Section>
              <TextContainer>
                {titleSection3 && <SectionHeader title={titleSection3} />}
                <DescriptionContainer>{descriptionSection3}</DescriptionContainer>
                {images[2] ? (
                  <ImageContainer>
                    <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
                  </ImageContainer>
                ) : null}
              </TextContainer>
            </Section>
          )}
        </Box>
      ) : (
        <Box>
          <SectionMobile>
            <ImageContainer>
              {!videoHeaderUrl ? (
                images[0] ? (
                  <img src={images[0]} onClick={() => expandImage(images[0])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
                ) : null
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
                <ImageContainer>
                  <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} more`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
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
                  <ImageContainer>
                    <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
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

export default PersonalTemplate;
