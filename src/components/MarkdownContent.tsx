'use client';

import { useMemo, memo } from 'react';
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

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

const headingComponent = (Tag: 'h1' | 'h2' | 'h3') => {
    const Component = ({ children, ...props }: React.ComponentProps<'h1'>) => {
        const text = children?.toString() || '';
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return <Tag id={id} {...props}>{children}</Tag>;
    };
    Component.displayName = `Heading_${Tag}`;
    return Component;
};

const mdComponents = {
    h1: headingComponent('h1'),
    h2: headingComponent('h2'),
    h3: headingComponent('h3'),
};

export default memo(function MarkdownContent({ content }: MarkdownContentProps) {
    const cleanedContent = useMemo(() => cleanContent(content), [content]);

    return (
        <div className="markdown-body">
            <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={mdComponents}
            >
                {cleanedContent}
            </ReactMarkdown>
        </div>
    );
});
