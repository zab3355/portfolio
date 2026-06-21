import { KeyboardEvent, memo, useCallback, useMemo } from "react";
import { Avatar, AvatarGroup, Box, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BlogAuthor, BlogPostCardProps } from "../../shared/types/types";
import { getPreviewFromMarkdown } from "../../shared/config/markdownPreviewHelper";

const CardRoot = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    isolation: 'isolate',
    contain: 'layout paint',
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.2s ease',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        boxShadow: `inset 0 0 0 2px ${theme.palette.custom.orangePalette.background}`,
        opacity: 0,
        transition: 'opacity 0.2s ease',
        willChange: 'opacity',
        pointerEvents: 'none',
        zIndex: 2,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        opacity: 0,
        transition: 'opacity 0.2s ease',
        willChange: 'opacity',
        pointerEvents: 'none',
    },
    '@media (hover: hover)': {
        '&:hover': {
            transform: 'translateY(-4px)',
            '&::before': { opacity: 1 },
            '&::after': { opacity: 1 },
            '& .blog-card-image': { transform: 'scale(1.04)' },
        },
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.custom.orangePalette.background}`,
        outlineOffset: 2,
        transform: 'translateY(-2px)',
        '&::before': { opacity: 1 },
        '&::after': { opacity: 0.7 },
    },
}));

const CardImageWrapper = styled(Box)({
    overflow: 'hidden',
    aspectRatio: '16/9',
    borderRadius: '8px 8px 0 0',
});

const CardImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.35s ease',
});

const CardContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const TagChip = styled(Chip)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.custom.orangePalette.background,
    color: '#fff',
    fontWeight: 600,
}));

const PreviewText = styled(Typography)({
    minHeight: 48,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
});

const MetaRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
}));

const AuthorAvatar = styled(Avatar)({
    width: 24,
    height: 24,
});

function BlogPostCard({ post, onOpenPost }: BlogPostCardProps) {
    const preview = useMemo(() => getPreviewFromMarkdown(post.description), [post.description]);
    const handleClick = useCallback(() => {
        onOpenPost(post.slug);
    }, [onOpenPost, post.slug]);
    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick();
        }
    }, [handleClick]);

    return (
        <CardRoot
            onClick={handleClick}
            tabIndex={0}
            role="button"
            onKeyDown={handleKeyDown}
            aria-label={`Read post: ${post.title}`}
        >
            <CardImageWrapper>
                <CardImage
                    className="blog-card-image"
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                />
            </CardImageWrapper>

            <CardContent>
                <TagChip label={post.tag} size="small" />
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    {post.title}
                </Typography>
                <PreviewText
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    {preview}
                </PreviewText>
                <MetaRow>
                    <AvatarGroup max={3}>
                        {post.authors.map((author: BlogAuthor, idx: number) => (
                            <AuthorAvatar
                                key={idx}
                                src={author.avatar}
                                alt={author.name}
                            />
                        ))}
                    </AvatarGroup>
                    <Typography variant="caption" color="text.secondary">
                        {post.date}
                    </Typography>
                </MetaRow>
            </CardContent>
        </CardRoot>
    );
}

export default memo(BlogPostCard);
