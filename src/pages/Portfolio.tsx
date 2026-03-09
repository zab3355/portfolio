import { Box } from '@mui/material';
import Projects from '../shared/components/projects';
import About from '../shared/components/about';
import PageHeroBanner from '../shared/components/PageHeroBanner';

const Portfolio = () => {
  return (
    <Box>
      <PageHeroBanner title="Portfolio" filePath="pages/portfolio.tsx" />
      <About />
      <Projects />
    </Box>
  );
};

export default Portfolio;
