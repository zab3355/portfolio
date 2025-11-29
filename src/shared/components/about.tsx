import { Box, List, ListItem, Typography } from '@mui/material';
import { styled, useMediaQuery, useTheme } from '@mui/system';
import aboutImage from '../../assets/images/about-img.png';
import { aboutText } from '../constants/constants';
import SectionHeader from './sectionHeader';

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '2rem',
});

const ContentContainerMobile = styled(Box)({
  display: 'block',
  flexDirection: 'row',
  padding: '2rem',
});
const AboutTitleText = styled(Typography)(() => ({
  fontFamily: 'Poppins',
  fontWeight: '700',
  justifyContent: 'left',
  display: 'flex',
  fontSize: '42px',
}));

const ImageContainer = styled(Box)({
  flex: '1',
  marginRight: '2rem',
  width: '100%',
});
const ImageBox = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TextContainer = styled(Box)({
  flex: '1',
});

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      {!isMobile ? (
        <ContentContainer>
          <ImageContainer>
            <img src={aboutImage} alt={"Image of me!"} style={{ width: '100%' }} />
          </ImageContainer>
          <TextContainer>
            <AboutTitleText>{aboutText.heading}</AboutTitleText>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '14px'
              }}
            >

              <Box
                sx={{
                  position: 'absolute',
                  left: '51.5%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#e45447',
                }}
              ></Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: '150px',
                  left: '51.5%',
                  height: '2px',
                  backgroundColor: '#e45447',
                }}
              >
              </Box>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-line" }}>
                {aboutText.body}
              </Typography>

              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {aboutText.expertise.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <Typography variant="body1" component="span" dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
                {aboutText.conclusion}
              </Typography>
            </Box>
          </TextContainer>
        </ContentContainer>) : (<ContentContainerMobile>
          <ImageContainer>
            <img src={aboutImage} alt={"Image of me!"} style={{ width: '100%' }} />
          </ImageContainer>
          <TextContainer>
            <SectionHeader title={aboutText.heading} />
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-line" }}>
                {aboutText.body}
              </Typography>

              <List sx={{ pl: 4, listStyleType: 'disc' }}>
                {aboutText.expertise.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                    <Typography variant="body1" component="span" dangerouslySetInnerHTML={{ __html: item }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
                {aboutText.conclusion}
              </Typography>
            </Box>
          </TextContainer>
        </ContentContainerMobile>
      )}
    </div>
  );
};
export default About;