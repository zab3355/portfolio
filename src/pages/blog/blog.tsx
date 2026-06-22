import { useCallback } from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import blogPosts from '../../data/blogPosts';
import BlogPostCard from './blogPostcard';
import PageHeroBanner from '../../shared/components/PageHeroBanner';

const BlogRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
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

export default function Blog() {
  const navigate = useNavigate();
  const handleOpenPost = useCallback((slug: string) => {
    navigate(`/blog/${slug}`);
  }, [navigate]);

  return (
    <BlogRoot>
      <PageHeroBanner
        title="Blog"
        filePath="pages/blog/blog.tsx"
        visualMode="blog"
      />
      <StyledContainer>
        <Grid container spacing={2}>
          {blogPosts.map((post) => (
            <Grid key={post.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <BlogPostCard post={post} onOpenPost={handleOpenPost} />
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </BlogRoot>
  );
}
