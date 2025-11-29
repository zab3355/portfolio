import { Box } from "@mui/material";
import { BlogDetailProps } from "../../shared/types/types";
import BlogTemplate from "./blogTemplate";
import MarkdownRenderer from "../../shared/config/markdownRenderer";
import CircleButton from "../../shared/components/circleButton";

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack }) => {
    return (
        <Box>
            <BlogTemplate
                title={post.title}
                date={post.date}
                tag={post.tag}
                authors={post.authors}
                media={post.media}
            >
                {post.markdownPath ? (
                    <MarkdownRenderer src={post.markdownPath} />
                ) : (
                    <MarkdownRenderer content={post.description} />
                )}
                <CircleButton onClick={onBack}>Back to Blog</CircleButton>
            </BlogTemplate>
        </Box>
    );
};
export default BlogDetail;