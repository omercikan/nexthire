import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

const JobDescription = ({ description }: { description: string }) => {
  return (
    <div className="mb-12.5 prose max-w-none">
      {!description?.toLowerCase().includes("iş hakkında") && (
        <h2 className="text-[#202124] text-lg font-medium mb-5">İş Hakkında</h2>
      )}

      <Markdown
        allowedElements={[
          "p",
          "strong",
          "blockquote",
          "em",
          "ul",
          "ol",
          "li",
          "a",
          "code",
          "pre",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ]}
        components={{
          p: ({ children }) => (
            <p className="text-[#696969] text-[14px] sm:text-[15px] md:text-[16px] mb-3 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-4 sm:pl-5 my-3 sm:my-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-4 sm:pl-5 my-3 sm:my-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed mb-1 sm:mb-1.5">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800 wrap-break-word"
            >
              {children}
            </a>
          ),
          code({ children, className }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={oneDark}
                PreTag="div"
                className="rounded-lg my-4 text-sm sm:text-sm md:text-base"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs sm:text-sm md:text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-white p-3 sm:p-4 rounded-lg overflow-x-auto my-4 text-xs sm:text-sm md:text-base">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-3 sm:pl-4 italic text-gray-500 my-3 sm:my-4">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => (
            <h1 className="leading-relaxed text-2xl sm:text-3xl font-semibold mt-5 mb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="leading-relaxed text-lg sm:text-xl font-medium my-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="leading-relaxed text-base sm:text-lg font-normal my-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="leading-relaxed text-sm sm:text-md font-medium my-2">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="leading-relaxed text-xs sm:text-sm font-medium my-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="leading-relaxed text-xs font-medium my-2 text-gray-600">
              {children}
            </h6>
          ),
        }}
      >
        {description}
      </Markdown>
    </div>
  );
};

export default JobDescription;
