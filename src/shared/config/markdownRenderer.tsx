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
      <ReactMarkdown>{markdownToRender}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;