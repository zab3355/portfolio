import { useEffect } from 'react';
import { Box } from '@mui/material';
import ContactForm from '../shared/components/contactForm';
import PageHeroBanner from '../shared/components/PageHeroBanner';
import { useAppLoad } from '../context/AppLoadContext';

const Contact = () => {
  const { setAppReady } = useAppLoad();
  useEffect(() => { setAppReady(); }, [setAppReady]);

  return (
    <Box>
      <PageHeroBanner title="Contact" filePath="pages/contact.tsx" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
