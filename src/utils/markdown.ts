export const convertToMarkdown = (html: string): string => {
  return html
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const parseMarkdown = (markdown: string): string => {
  const paragraphs = markdown.split(/\n\s*\n/);
  return paragraphs
    .map(para => {
      if (!para.trim()) return '<p><br></p>';
      const lines = para.split('\n');
      return `<p>${lines.join('<br>')}</p>`;
    })
    .join('');
};