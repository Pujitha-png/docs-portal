import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../components/CodeBlock";
import FeedbackWidget from "../components/FeedbackWidget";

export default async function DocPage({
  params,
}: {
  params: { lang: string; version: string; slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "_docs",
    params.lang,
    params.version,
    `${params.slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <div>Document not found</div>;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            return (
              <CodeBlock className={className}>
                {children}
              </CodeBlock>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      <div className="mt-12">
        <FeedbackWidget />
      </div>
    </article>
  );
}
