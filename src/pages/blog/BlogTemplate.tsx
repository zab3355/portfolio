import * as React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';

export interface BlogMedia {
    type: 'image' | 'video';
    src: string;
    alt?: string;
}

export interface BlogAuthor {
    name: string;
    avatar: string;
}

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
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Chip label={tag} sx={{ mb: 2 }} />
            <Typography variant="h3" fontWeight={700} gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {authors.map((author, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={author.avatar} alt={author.name} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2">{author.name}</Typography>
                    </Box>
                ))}
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                    {date}
                </Typography>
            </Box>
            {media.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                    {media.map((item, idx) =>
                        item.type === 'image' ? (
                            <img
                                key={idx}
                                src={item.src}
                                alt={item.alt || ''}
                                style={{ width: '100%', borderRadius: 8 }}
                            />
                        ) : (
                            <video
                                key={idx}
                                src={item.src}
                                controls
                                style={{ width: '100%', borderRadius: 8 }}
                            />
                        )
                    )}
                </Box>
            )}
            <Box sx={{ mt: 2 }}>{children}</Box>
        </Box>
    );
};

export default BlogTemplate;
