import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { projectText, projectBoxes } from '../constants/constants';
import SectionHeader from './sectionHeader';

// All styled components defined OUTSIDE the component — created once, not on every render

const BoxesContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '3rem',
  padding: '8rem',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    padding: '2rem',
    paddingBottom: '2rem',
  },
}));

const BoxItem = styled(motion.div)({
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  justifySelf: 'center',
  width: 'fit-content',
  border: '2px solid transparent',
  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  '&:hover .project-image': {
    filter: 'brightness(0.5)',
  },
  '&:hover .hover-text': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const HoveredBoxTitle = styled(Typography)(({ theme }) => ({
  bottom: '60px',
  position: 'absolute',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Poppins',
  fontWeight: 700,
  backgroundColor: theme.palette.custom.orangePalette.background,
  padding: '5px',
  zIndex: 99999,
  color: '#fff',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.5s, transform 0.5s',
}));

interface FiltersContainerProps {
  isMobile: boolean;
  accentColor: string;
}

const FiltersContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'accentColor',
})<FiltersContainerProps>(({ isMobile, accentColor }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: accentColor,
  padding: isMobile ? '10px 6px' : '12px 134px',
  borderBottom: '8px solid rgba(255,255,255,0.15)',
  margin: '50px auto',
  width: 'fit-content',
}));

const FilterImage = styled('img')(({ theme }) => ({
  '--color': theme.palette.custom.orangePalette.background,
  '--border': '10px',
  '--offset': '20px',
  '--gap': '5px',
  '--_c': `var(--color) var(--border), #0000 0 calc(100% - var(--border)), var(--color) 0`,
  '--_o': 'calc(3 * var(--offset))',
  padding: `
    calc(var(--gap) + var(--border))
    calc(var(--gap) + var(--border) + var(--offset))
    calc(var(--gap) + var(--border) + var(--offset))
    calc(var(--gap) + var(--border))
  `,
  background: `
    linear-gradient(var(--_c)) var(--_o) var(--_o),
    linear-gradient(90deg, var(--_c)) var(--_o) var(--_o)
  `,
  backgroundSize: 'calc(100% - var(--_o)) calc(100% - var(--_o))',
  backgroundRepeat: 'no-repeat',
  width: '70%',
  transition: '.5s',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundPosition: '0px 0px',
    backgroundSize: 'calc(100% - var(--offset)) calc(100% - var(--offset))',
  },
} as any));

const FilterButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  color: selected ? theme.palette.custom.base.black : theme.palette.custom.base.white,
  textTransform: 'uppercase',
  margin: '0 50px',
  cursor: 'pointer',
  fontWeight: selected ? 600 : 400,
  '&:hover, &:focus': {
    fontWeight: 500,
  },
}));

const Projects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filter, setFilter] = useState('Work');

  const filteredBoxes = filter === 'All' ? projectBoxes : projectBoxes.filter(box => box.type === filter);

  return (
    <Box>
      <Box sx={{ px: isMobile ? 2 : 8, mt: '80px', mb: '30px' }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: isMobile ? '40px' : '60px',
            mb: 1,
          }}
        >
          {projectText.title}
        </Typography>
        <SectionHeader title="" />
      </Box>

      <FiltersContainer isMobile={isMobile} accentColor={theme.palette.custom.orangePalette.background}>
        <FilterButton selected={filter === 'Work'} onClick={() => setFilter('Work')}>Work</FilterButton>
        <FilterButton selected={filter === 'Personal'} onClick={() => setFilter('Personal')}>Personal</FilterButton>
      </FiltersContainer>

      <BoxesContainer>
        {filteredBoxes.map(box => (
          <BoxItem
            key={box.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!isMobile && <HoveredBoxTitle className="hover-text">{box.content}</HoveredBoxTitle>}
            <FilterImage
              className="project-image"
              src={box.imageUrl}
              alt={box.content}
              onClick={() => navigate(box.link)}
            />
          </BoxItem>
        ))}
      </BoxesContainer>
    </Box>
  );
};

export default Projects;
