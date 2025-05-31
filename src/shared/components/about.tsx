import { Box, List, ListItem, Typography } from '@mui/material';
import { styled, useMediaQuery, useTheme } from '@mui/system';
import placeholderImage from '../../assets/images/about-img.png';
import { aboutText } from '../constants/constants';

const ContentContainer = styled(Box)({
  display: 'flex',
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
          <img src={placeholderImage} alt={"Test"} style={{ width: '7O%', margin: '10%' }} />
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
      </ContentContainer>) : ( null
      ) }
</div>
);
};
export default About;