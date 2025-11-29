export const getPreviewFromMarkdown = (markdown: string, maxLength = 160): string => {
    const noHashes = markdown.replace(/[#_*`>-]/g, '');
    const trimmed = noHashes.trim();
    if (trimmed.length <= maxLength) return trimmed;
    return trimmed.slice(0, maxLength).trim() + '…';
};
