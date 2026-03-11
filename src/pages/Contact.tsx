import { Box } from '@mui/material';
import ContactForm from '../shared/components/contactForm';
import PageHeroBanner from '../shared/components/PageHeroBanner';

const Contact = () => {
  return (
    <Box>
      <PageHeroBanner title="Contact" filePath="pages/contact.tsx" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
