import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { projectText, projectBoxes } from '../constants/constants';

const BoxesContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '10px',
  gap: '3rem',
  padding: '8rem',
});

const BoxesContainerMobile = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridGap: '10px',
  gap: '3rem',
  paddingBottom: '2rem',
});

const BoxItemMobile = styled(motion.div)(() => ({
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid transparent`,
  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
}));

const BoxItem = styled(motion.div)(() => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  justifySelf: 'center',
  width: 'fit-content',
  border: `2px solid transparent`,
  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundPosition: '0px 0px',
    backgroundSize: 'calc(100% - var(--offset)) calc(100% - var(--offset))',
  },
  '&:hover .project-item': {
    filter: 'brightness(0.5)',
  },
  '&:hover .hover-text': {
    opacity: 1,
    transform: 'translateY(0)',
  },

}));

const HoveredBoxTitle = styled(Typography)(({ theme }) => ({
  bottom: '60px',
  position: 'absolute',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Poppins',
  fontWeight: '700',
  alignSelf: 'center',
  display: 'flex',
  backgroundColor: theme.palette.custom.primary.main,
  padding: '5px',
  zIndex: 99999,
  color: 'white',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.5s, transform 0.5s'
}));

const Projects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filter, setFilter] = useState('Work');

  const FiltersContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f37b24',
    padding: isMobile ? '10px 6px' : '12px 134px',
    borderBottom: '8px solid wheat',
    margin: '50px auto',
    width: 'fit-content',
  });
  const FilterImage = styled('img')(({ theme }) => ({
    '--color': theme.palette.custom.primary.main, /* the border color */
    '--border': '10px',   /* the border thickness*/
    '--offset': '20px',   /* control the offset*/
    '--gap': '5px',       /* the gap on hover */

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

    '&:hover::before': {
      content: '""',
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      opacity: 0.6,
      transition: 'opacity 0.5s',
    },

    '&:hover .hover-text': {
      opacity: 1,
      zIndex: 999,
      transform: 'translateY(0)',
    },

    '&:hover .hover-description': {
      opacity: 1,
      zIndex: 999,
      transform: 'translateY(0)',
    }
  }));

  const FilterButton = styled(Typography)<{ selected: boolean }>(({ theme, selected }) => ({
    color: selected ? theme.palette.custom.base.black : theme.palette.custom.base.white,
    textTransform: 'uppercase',
    margin: '0 50px',
    cursor: 'pointer',
    '&:hover, &:focus': {
      fontWeight: '500'
    },
  }));

  const filteredBoxes = filter === 'All' ? projectBoxes : projectBoxes.filter(box => box.type === filter);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  const handleImageClick = (link: string) => {
    navigate(link);
  };

  return (
    <Box>
      <Typography variant="h1" style={{ fontFamily: 'Poppins', fontWeight: '700', justifyContent: 'center', display: 'flex', marginTop: '80px', marginBottom: '30px', fontSize: isMobile ? '40px' : '60px' }}>
        {projectText.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
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
            height: '2px',
            backgroundColor: '#e45447',
          }}
        >
        </Box>
      </Box>
      <FiltersContainer>
        <FilterButton selected={filter === 'Work'} onClick={() => handleFilterChange('Work')}>Work</FilterButton>
        <FilterButton selected={filter === 'Personal'} onClick={() => handleFilterChange('Personal')}>Personal</FilterButton>
      </FiltersContainer>
      {isMobile ?
        <BoxesContainerMobile>
          {filteredBoxes.map(box => (
            <BoxItemMobile
              key={box.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FilterImage src={box.imageUrl} alt={box.content} />

            </BoxItemMobile>
          ))}
        </BoxesContainerMobile>
        : <BoxesContainer>
          {filteredBoxes.map(box => (
            <BoxItem
              className="project-item"
              key={box.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HoveredBoxTitle className="hover-text">{box.content}</HoveredBoxTitle>

              <FilterImage src={box.imageUrl} alt={box.content} onClick={() => handleImageClick(box.link)}></FilterImage>

            </BoxItem>
          ))}
        </BoxesContainer>}
    </Box>
  );
};
export default Projects;