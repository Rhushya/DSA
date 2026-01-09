'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownContentProps {
    content: string;
}

// Clean file paths from headings like "Static Arrays (`02 ARRAYS/03...`)"
function cleanContent(content: string): string {
    // Remove file path references in parentheses/backticks
    return content
        .replace(/\s*\(`[^`]+\.txt`\)/g, '')
        .replace(/\s*\(`[^`]+\.py`\)/g, '')
        .replace(/\s*\([^)]*\/[^)]*\.(txt|py|md)\)/gi, '')
        .replace(/`\d+\s+[A-Z]+\/[^`]+`/g, '');
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
    const cleanedContent = cleanContent(content);

    return (
        <div className="prose prose-gray max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ children, ...props }) => {
                        const text = children?.toString() || '';
                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                        return <h1 id={id} {...props}>{children}</h1>;
                    },
                    h2: ({ children, ...props }) => {
                        const text = children?.toString() || '';
                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                        return <h2 id={id} {...props}>{children}</h2>;
                    },
                    h3: ({ children, ...props }) => {
                        const text = children?.toString() || '';
                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                        return <h3 id={id} {...props}>{children}</h3>;
                    },
                }}
            >
                {cleanedContent}
            </ReactMarkdown>
        </div>
    );
}
