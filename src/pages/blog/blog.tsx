import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import blogPosts from '../../data/blogPosts';
import BlogPostCard from './blogPostcard';
import BlogDetail from './blogDetail';
import PageHeroBanner from '../../shared/components/PageHeroBanner';
import { BlogPost } from '../../shared/types/types';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PageHeroBanner
        title="Blog"
        filePath="pages/blog/blog.tsx"
        subtitle="Read my latest posts"
      />
      <StyledContainer>
        {selectedPost ? (
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <Grid container spacing={2}>
            {blogPosts.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <BlogPostCard post={post} onClick={() => setSelectedPost(post)} />
              </Grid>
            ))}
          </Grid>
        )}
      </StyledContainer>
    </Box>
  );
}
