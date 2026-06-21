import { useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import blogPosts from '../../data/blogPosts';
import BlogTemplate from "./BlogTemplate";
import MarkdownRenderer from "../../shared/config/markdownRenderer";
import CircleButton from "../../shared/components/circleButton";

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const handleBackToBlog = useCallback(() => {
        navigate('/blog');
    }, [navigate]);
    const post = useMemo(() => blogPosts.find((entry) => entry.slug === slug), [slug]);
    const footer = useMemo(() => (
        <CircleButton onClick={handleBackToBlog}>Back to Blog</CircleButton>
    ), [handleBackToBlog]);

    if (!post) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5">Post not found.</Typography>
                <CircleButton onClick={handleBackToBlog}>Back to Blog</CircleButton>
            </Box>
        );
    }

    return (
        <Box>
            <BlogTemplate
                title={post.title}
                date={post.date}
                tag={post.tag}
                authors={post.authors}
                media={post.media}
                footer={footer}
            >
                {post.markdownPath ? (
                    <MarkdownRenderer src={post.markdownPath} />
                ) : (
                    <MarkdownRenderer content={post.description} />
                )}
            </BlogTemplate>
        </Box>
    );
}