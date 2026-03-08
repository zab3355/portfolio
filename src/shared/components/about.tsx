import { Box, List, ListItem, Typography } from '@mui/material';
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
