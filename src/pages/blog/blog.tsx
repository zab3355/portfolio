import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SectionHeader from '../../shared/components/sectionHeader';
import bannerImage from '../../assets/images/banner.jpg';
import { blogPosts, blogText } from '../../shared/constants/constants';
import BlogPostCard from './blogPostcard';
import BlogDetail from './blogDetail';

const SplashContainer = styled(Box)({
  width: '100%',
  height: '400px',
  background: `url(${bannerImage})`,
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  animation: 'fadeIn 2s',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ImageText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '50px',
  marginTop: '320px',
  marginLeft: '20px',
  fontWeight: '700',
  zIndex: '999',
  color: theme.palette.custom.primary.light,
  animation: 'fadeIn 2s',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));


export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const blogPostsArray = [blogPosts];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ImageText>Blog</ImageText>
      <SplashContainer />
      <StyledContainer>
        <SectionHeader title={blogText.heading} />

        {selectedPost ? (
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <Grid container spacing={2}>
            {blogPostsArray.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <BlogPostCard post={post} onClick={() => setSelectedPost(post)} />
              </Grid>
            ))}
          </Grid>
        )}
      </StyledContainer>
    </Box>
  );
};