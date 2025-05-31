import { Box, IconButton,styled, useMediaQuery, useTheme } from '@mui/material';
import { ReactComponent as Logo} from '../assets/icons/logo.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const LogoButton = styled(Logo)(({theme}) => ({
  height: '60px',
  marginTop: '12px',
  width: 'fit-content',
  ...(theme.palette.mode === "dark" && {
  filter: 'invert(102%) sepia(93%) saturate(0%) hue-rotate(87deg) brightness(119%) contrast(119%)'
})
}));
  
  const FooterIconWrapper = styled('a')({
    display: 'inline-flex',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s ease, transform 0.2s ease',
    '&:hover, &:focus': {
      color: '#ffa726', 
      transform: 'scale(1.1)',
    },
  });
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const FooterContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: isMobile ? theme.palette.custom.navbar.mobileBackground : theme.palette.custom.navbar.desktopBackground,
    color:  isMobile ? theme.palette.custom.navbar.mobileTextColor : theme.palette.custom.navbar.desktopTextColor,
    textAlign: 'center',
    padding: '1rem 0',
    position: 'relative',
    display: 'block',
    bottom: 0,
    left: 0,
  }));
  return (
    <FooterContainer>
    <Box>
        <FooterIconWrapper
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <IconButton>
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </FooterIconWrapper>
        <FooterIconWrapper
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <IconButton>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </FooterIconWrapper>
        <FooterIconWrapper
          href="mailto:your.email@example.com"
          aria-label="Email"
        >
          <IconButton>
            <EmailIcon fontSize="large" />
          </IconButton>
        </FooterIconWrapper>
      </Box>
      <LogoButton/>
    </FooterContainer>
  );
};

  export default Footer;