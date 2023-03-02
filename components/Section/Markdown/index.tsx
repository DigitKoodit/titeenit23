import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noreferrer">
            {props.children}
          </a>
        ),
      }}
      remarkPlugins={[gfm]}
    >
      {content}
    </ReactMarkdown>
  );
};
