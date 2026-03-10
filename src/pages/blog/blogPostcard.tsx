import { Avatar, AvatarGroup, Box, Chip, Typography } from "@mui/material";
import { BlogAuthor, BlogPostCardProps } from "../../shared/types/types";
import { getPreviewFromMarkdown } from "../../shared/config/markdownPreviewHelper";

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
    const preview = getPreviewFromMarkdown(post.description);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'background.paper',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            <img
                src={post.img}
                alt={post.title}
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                }}
            />
            <Box sx={{ p: 2 }}>
                <Chip label={post.tag} size="small" sx={{ mb: 1 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
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