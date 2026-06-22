import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, CircularProgress } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { MarkdownRendererProps } from '../types/types';

// Module-level cache — survives component unmount/remount within the same session.
// Prevents re-fetching the same markdown file when the user navigates back and reopens a post.
const markdownCache = new Map<string, string>();

const MarkdownBody = styled('div')({
  fontFamily: 'inherit',
  lineHeight: 1.7,
});

const MarkdownImageWrapper = styled('span')({
  display: 'block',
  textAlign: 'center',
  margin: '1.5rem 0',
});

const MarkdownImage = styled('img')({
  maxWidth: '100%',
  width: '560px',
  height: 'auto',
  borderRadius: '8px',
  display: 'inline-block',
});

export default function MarkdownRenderer({ src, content }: MarkdownRendererProps) {
  const [fetchedContent, setFetchedContent] = useState<string>(() =>
    src ? (markdownCache.get(src) ?? '') : ''
  );

  useEffect(() => {
    if (!src) return;
    if (markdownCache.has(src)) {
      setFetchedContent(markdownCache.get(src)!);
      return;
    }

    let isCancelled = false;

    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (!isCancelled) {
          markdownCache.set(src, text);
          setFetchedContent(text);
        }
      })
      .catch(() => {
        if (!isCancelled) setFetchedContent('Failed to load content.');
      });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  const markdownToRender = src ? fetchedContent : content ?? '';
  const isLoading = !!src && !fetchedContent;
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={40} sx={{ color: theme.palette.custom.orangePalette.background }} />
      </Box>
    );
  }

  return (
    <MarkdownBody className="markdown-body">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <MarkdownImageWrapper>
              <MarkdownImage
                src={src}
                alt={alt ?? ''}
                loading="lazy"
                decoding="async"
              />
            </MarkdownImageWrapper>
          ),
        }}
      >
        {markdownToRender}
      </ReactMarkdown>
    </MarkdownBody>
  );
}