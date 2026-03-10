import { Box, List, ListItem, Typography } from '@mui/material';
import { styled, useMediaQuery, useTheme } from '@mui/system';
import ReactPlayer from 'react-player';
import PageHeroBanner from '../../shared/components/PageHeroBanner';
import SectionHeader from '../../shared/components/sectionHeader';

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

const AnimationContainer = styled(Box)({
  animation: 'fadeIn 1s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
});

const Section = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '94%',
  margin: '4rem'
});

const SectionMobile = styled(Box)({
  display: 'block',
  justifyContent: 'space-between',
  width: 'auto',
});

const DescriptionContainer = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  marginBottom: '1rem',
  margin: '1rem',
});

const ListContainer = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '16px',
});

const ImageContainer = styled(Box)({
  flex: '1',
  margin: '1rem',
});

const TextContainer = styled(Box)({
  flex: '1',
});

const WorkTemplate = ({ title, title2, description, images, videoHeaderUrl, titleSection2, descriptionSection2, titleSection3, descriptionSection3, titleSection4, descriptionSection4, descriptionSectionFull }: WorkTemplateProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expandImage = (image?: string) => {
    window.open(image, '_blank');
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
                images[0] ? (
                  <img src={images[0]} onClick={() => { expandImage(images[0]) }} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
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
                  <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
                </ImageContainer>
              ) : null}
            </Section>
          )}

          {(titleSection3 || descriptionSection3) && (
            <Section>
              <ImageContainer>
                {images[2] && <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />}
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
                <ImageContainer>
                  <img src={images[3]} onClick={() => expandImage(images[3])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
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
            <ImageContainer>
              <img src={images[5]} onClick={() => expandImage(images[5])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
            </ImageContainer>
          ) : null}
        </Box>
      ) : (
        <Box>
          <SectionMobile>
            <ImageContainer>
              {!videoHeaderUrl ? (
                images[0] ? (
                  <img src={images[0]} onClick={() => expandImage(images[0])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
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
                  <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} more`} style={{ width: '100%', height: 'auto' }} />
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
                    <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} screenshot`} style={{ width: '100%', height: 'auto' }} />
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
