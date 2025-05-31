import { Box, List, ListItem, Typography } from '@mui/material';
import { styled, useMediaQuery, useTheme } from '@mui/system';
import bannerImage from '../../assets/images/banner.jpg';
import ReactPlayer from 'react-player';
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
const AnimationContainer = styled(Box)({
  animation: 'fadeIn 1s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
});

const SplashContainer = styled(Box)({
  width: '100%',
  height: '400px',
  background: `url(${bannerImage})`,
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  filter: 'blur(3px)',
});

const ImageText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '50px',
  marginTop: '320px',
  marginLeft: '20px',
  fontWeight: '700',
  zIndex: '999',
  color: theme.palette.custom.base.white,
  animation: 'fadeIn 2s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
}));
const ImageMobileText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '50px',
  marginTop: '256px',
  marginLeft: '20px',
  fontWeight: '700',
  zIndex: '999',
  color: theme.palette.custom.base.white,
  animation: 'fadeIn 2s',
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
}));

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

const TitleContainer = styled(Typography)({
  fontFamily: 'Poppins',
  fontWeight: '700',
  fontSize: '24px',
  margin: '1rem',
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

const PersonalTemplate = ({ title, title2, description, images, videoHeaderUrl, titleSection2, descriptionSection2, titleSection3, descriptionSection3 }: PersonalTemplateProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const expandImage = (image?: string) => {
    window.open(image, '_blank');
  }
  return (
    <AnimationContainer>
      {!isMobile ? (
        <Box>
          <ImageText>{title}</ImageText>
          <SplashContainer />
          <Section>
            <ImageContainer>
              {!videoHeaderUrl ? (
                <img src={images[0]} onClick={() => { expandImage(images[0]) }} alt={`${title} ${images[0]}`} style={{ width: '100%', height: 'auto' }} />
              ) : (
                <ReactPlayer
                  url={videoHeaderUrl}>
                </ReactPlayer>
              )}
            </ImageContainer>
            <TextContainer>
              <TitleContainer>
                {title2}
              </TitleContainer>
              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {description.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <ListContainer dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>
            </TextContainer>
          </Section>
          <Section>
            <TextContainer>
              <TitleContainer>
                {titleSection2}
              </TitleContainer>
              <DescriptionContainer>
                {descriptionSection2}
              </DescriptionContainer>
            </TextContainer>
            <ImageContainer>
              <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} ${images[1]}`} style={{ width: '100%', height: 'auto' }} />
            </ImageContainer>
          </Section>

          <Section>
            <TextContainer>
              {title[2].length > 0 ? (
                <TitleContainer>
                  {titleSection3}
                </TitleContainer>
              ) : null}
              {description[2].length > 0 ? (
                <DescriptionContainer>
                  {descriptionSection3}
                </DescriptionContainer>
              ) :
                null}
              {images[2] !== null ? (
                <ImageContainer>
                  <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} ${images[2]}`} style={{ width: '100%', height: 'auto' }} />
                </ImageContainer>
              ) : null}

            </TextContainer>
          </Section>
        </Box>) : (
        <Box>
          <SectionMobile>
            <ImageMobileText>{title}</ImageMobileText>
            <SplashContainer />
            <ImageContainer>
              {!videoHeaderUrl ? (
                <img src={images[0]} onClick={() => expandImage(images[0])} alt={`${title} ${images[0]}`} style={{ width: '100%', height: 'auto' }} />
              ) : (
                <ReactPlayer width='100%' height='auto'
                  url={videoHeaderUrl}>
                </ReactPlayer>
              )}
            </ImageContainer>
            <TextContainer>
              <TitleContainer>
                {title2}
              </TitleContainer>
              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {description.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <ListContainer dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>
            </TextContainer>
          </SectionMobile>
          <SectionMobile>
            <TextContainer>
              <TitleContainer>
                {titleSection2}
              </TitleContainer>
              <DescriptionContainer>
                {descriptionSection2}
              </DescriptionContainer>
            </TextContainer>
            <ImageContainer>
              <img src={images[1]} onClick={() => expandImage(images[1])} alt={`${title} more`} style={{ width: '100%', height: 'auto' }} />
            </ImageContainer>
          </SectionMobile>
          <SectionMobile>
            <TextContainer>
              {title[2].length > 0 ? (
                <TitleContainer>
                  {titleSection3}
                </TitleContainer>
              ) : null}
              {description[2].length > 0 ? (
                <DescriptionContainer>
                  {descriptionSection3}
                </DescriptionContainer>
              ) :
                null}
              {images[2] !== null ? (
                <ImageContainer>
                  <img src={images[2]} onClick={() => expandImage(images[2])} alt={`${title} ${images[2]}`} style={{ width: '100%', height: 'auto' }} />
                </ImageContainer>
              ) : null}
            </TextContainer>
          </SectionMobile>
        </Box>
      )
      }
    </AnimationContainer >

  );
};

export default PersonalTemplate;