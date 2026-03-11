import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MarkdownRendererProps } from '../types/types';

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ src, content }) => {
  const [fetchedContent, setFetchedContent] = useState<string>('');

  useEffect(() => {
    if (!src) return;

    let isCancelled = false;

    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (!isCancelled) setFetchedContent(text);
      })
      .catch(() => {
        if (!isCancelled) setFetchedContent('Failed to load content.');
      });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  const markdownToRender = src ? fetchedContent : content ?? '';

  return (
    <div
      className="markdown-body"
      style={{ fontFamily: 'inherit', lineHeight: 1.7 }}
    >
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <span style={{ display: 'block', textAlign: 'center', margin: '1.5rem 0' }}>
              <img
                src={src}
                alt={alt ?? ''}
                style={{
                  maxWidth: '100%',
                  width: '560px',
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'inline-block',
                }}
              />
            </span>
          ),
        }}
      >
        {markdownToRender}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;