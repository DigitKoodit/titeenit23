import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h3: ({ node, ...props }) => <h3 className="flex flex-col" {...props} />,
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="self-center underline"
            target="_blank"
            rel="noreferrer"
          >
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
