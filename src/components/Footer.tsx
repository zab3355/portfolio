import { Box, IconButton, styled } from '@mui/material';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled('footer')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.custom.navbar.desktopBackground,
  color: theme.palette.custom.navbar.desktopTextColor,
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.custom.navbar.mobileBackground,
    color: theme.palette.custom.navbar.mobileTextColor,
  },
}));

const FooterIconLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: theme.palette.custom.base.white,
}));

const FooterIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.background.paper,
  transition: 'background-color 0.25s ease, transform 0.2s ease',
  fontSize: '34px',
  '&:hover, &:focus-visible': {
    color: theme.palette.custom.orangePalette.background,
    transform: 'scale(1.05)',
  },
}));

const LogoButton = styled(Logo)(({ theme }) => ({
  height: 60,
  marginTop: 12,
  width: 'fit-content',
  ...(theme.palette.mode === 'dark' && {
    filter:
      'invert(102%) sepia(93%) saturate(0%) hue-rotate(87deg) brightness(119%) contrast(119%)',
  }),
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          mb: 1,
        }}
      >
        <FooterIconLink
          href="https://www.linkedin.com/in/zab3355"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FooterIconButton>
            <LinkedInIcon fontSize="inherit" />
          </FooterIconButton>
        </FooterIconLink>

        <FooterIconLink
          href="https://github.com/zab3355"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FooterIconButton>
            <GitHubIcon fontSize="inherit" />
          </FooterIconButton>
        </FooterIconLink>

        <FooterIconLink href="mailto:me@zabrown.com" aria-label="Email">
          <FooterIconButton>
            <EmailIcon fontSize="inherit" />
          </FooterIconButton>
        </FooterIconLink>
      </Box>

      <LogoButton aria-label="Site Logo" />
    </FooterContainer>
  );
};

export default Footer;
