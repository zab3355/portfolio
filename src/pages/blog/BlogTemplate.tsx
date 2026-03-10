import * as React from 'react';
import { Box, Avatar, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BlogAuthor, BlogMedia } from '../../shared/types/types';

export type { BlogAuthor, BlogMedia };

export interface BlogTemplateProps {
  title: string;
  date: string;
  tag: string;
  authors: BlogAuthor[];
  media?: BlogMedia[];
  children: React.ReactNode;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title,
  date,
  tag,
  authors,
  media = [],
  children,
}) => {
  const theme = useTheme();
  const accent = theme.palette.custom.orangePalette.background;

  const heroMedia = media[0];

  return (
    <Box>
      {/* Hero image */}
      {heroMedia && heroMedia.type === 'image' && (
        <Box
          sx={{
            width: '100%',
            maxHeight: 420,
            overflow: 'hidden',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <img
            src={heroMedia.src}
            alt={heroMedia.alt || title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )}
      {heroMedia && heroMedia.type === 'video' && (
        <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <video src={heroMedia.src} controls style={{ width: '100%', display: 'block' }} />
        </Box>
      )}

      <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 1, sm: 2 } }}>
        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: { xs: '28px', sm: '40px' },
            mb: 1.5,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        {/* Accent underline */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 2 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: accent, flexShrink: 0 }} />
          <Box sx={{ width: 120, height: 2, backgroundColor: accent }} />
        </Box>

        {/* Chip + meta */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Chip label={tag} sx={{ backgroundColor: accent, color: '#fff', fontWeight: 600 }} />
          {authors.map((author, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={author.avatar} alt={author.name} sx={{ width: 28, height: 28 }} />
              <Typography variant="body2" fontWeight={500}>{author.name}</Typography>
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary">{date}</Typography>
        </Box>

        {/* Additional media */}
        {media.slice(1).length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {media.slice(1).map((item, idx) =>
              item.type === 'image' ? (
                <img key={idx} src={item.src} alt={item.alt || ''} style={{ width: '100%', borderRadius: 8 }} />
              ) : (
                <video key={idx} src={item.src} controls style={{ width: '100%', borderRadius: 8 }} />
              )
            )}
          </Box>
        )}

        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BlogTemplate;
