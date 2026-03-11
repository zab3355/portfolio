import { Avatar, AvatarGroup, Box, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BlogAuthor, BlogPostCardProps } from "../../shared/types/types";
import { getPreviewFromMarkdown } from "../../shared/config/markdownPreviewHelper";

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
    const preview = getPreviewFromMarkdown(post.description);
    const theme = useTheme();
    const accent = theme.palette.custom.orangePalette.background;

    return (
        <Box
            onClick={onClick}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            aria-label={`Read post: ${post.title}`}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                backgroundColor: 'background.paper',
                cursor: 'pointer',
                // Only transform transitions — GPU composited, no repaint
                transition: 'transform 0.2s ease',
                // Accent border via inset box-shadow, toggled with opacity (compositor-only)
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    boxShadow: `inset 0 0 0 2px ${accent}`,
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none',
                    zIndex: 2,
                },
                // Drop shadow toggled with opacity (compositor-only, visible because no overflow:hidden)
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    boxShadow: `0 12px 32px rgba(0,0,0,0.3)`,
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none',
                },
                '@media (hover: hover)': {
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        '&::before': { opacity: 1 },
                        '&::after': { opacity: 1 },
                        '& .card-img': { transform: 'scale(1.04)' },
                    },
                },
                '&:focus-visible': {
                    outline: `2px solid ${accent}`,
                    outlineOffset: 2,
                    transform: 'translateY(-2px)',
                    '&::before': { opacity: 1 },
                    '&::after': { opacity: 0.7 },
                },
            }}
        >
            {/* Image wrapper — clips the scale animation */}
            <Box sx={{ overflow: 'hidden', aspectRatio: '16/9', borderRadius: '8px 8px 0 0' }}>
                <Box
                    component="img"
                    className="card-img"
                    src={post.img}
                    alt={post.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.35s ease',
                    }}
                />
            </Box>

            <Box sx={{ p: 2 }}>
                <Chip
                    label={post.tag}
                    size="small"
                    sx={{ mb: 1, backgroundColor: accent, color: '#fff', fontWeight: 600 }}
                />
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    {post.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                        minHeight: 48,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                    }}
                >
                    {preview}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <AvatarGroup max={3}>
                        {post.authors.map((author: BlogAuthor, idx: number) => (
                            <Avatar
                                key={idx}
                                src={author.avatar}
                                alt={author.name}
                                sx={{ width: 24, height: 24 }}
                            />
                        ))}
                    </AvatarGroup>
                    <Typography variant="caption" color="text.secondary">
                        {post.date}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BlogPostCard;
