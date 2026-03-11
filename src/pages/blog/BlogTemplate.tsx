import * as React from 'react';
import { Box, Avatar, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player/youtube';
import { BlogAuthor, BlogMedia } from '../../shared/types/types';

export type { BlogAuthor, BlogMedia };

export interface BlogTemplateProps {
  title: string;
  date: string;
  tag: string;
  authors: BlogAuthor[];
  media?: BlogMedia[];
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title,
  date,
  tag,
  authors,
  media = [],
  children,
  footer,
}) => {
  const theme = useTheme();
  const accent = theme.palette.custom.orangePalette.background;

  const heroMedia = media[0];
  const allYoutube = media.length > 0 && media.every(m => m.type === 'youtube');

  return (
    <Box>
      {/* Hero image only — stays at top */}
      {heroMedia && heroMedia.type === 'image' && (
        <Box sx={{ width: '100%', maxHeight: 420, overflow: 'hidden', borderRadius: 2, mb: 3 }}>
          <img
            src={heroMedia.src}
            alt={heroMedia.alt || title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

        <Box sx={{ mt: 2 }}>{children}</Box>

        {/* Videos at bottom */}
        {allYoutube && (
          <Box sx={{ display: 'flex', gap: 2, mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            {media.map((item, idx) => (
              <Box key={idx} sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', aspectRatio: '16/9' }}>
                <ReactPlayer url={item.src} width="100%" height="100%" controls />
              </Box>
            ))}
          </Box>
        )}
        {!allYoutube && media.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
            {media.map((item, idx) =>
              item.type === 'image' ? null : item.type === 'youtube' ? (
                <Box key={idx} sx={{ borderRadius: 2, overflow: 'hidden', aspectRatio: '16/9' }}>
                  <ReactPlayer url={item.src} width="100%" height="100%" controls />
                </Box>
              ) : (
                <video key={idx} src={item.src} controls style={{ width: '100%', borderRadius: 8 }} />
              )
            )}
          </Box>
        )}

        {footer && <Box sx={{ mt: 4 }}>{footer}</Box>}
      </Box>
    </Box>
  );
};

export default BlogTemplate;
