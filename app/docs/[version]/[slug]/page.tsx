import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../../../components/CodeBlock";
import FeedbackWidget from "../../../components/FeedbackWidget";
import TableOfContents from "../../../components/TableOfContents";
import { SUPPORTED_VERSIONS, getDoc, getDocSlugs, getHeadings, slugify } from "../../../../lib/docs";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const value = node as { props?: { children?: React.ReactNode } };
    return extractText(value.props?.children ?? "");
  }

  return "";
}

export const revalidate = 60;

export async function generateStaticParams() {
  const params: { version: string; slug: string }[] = [];

  for (const version of SUPPORTED_VERSIONS) {
    const slugs = getDocSlugs("en", version);
    for (const slug of slugs) {
      params.push({ version, slug });
    }
  }

  return params;
}

export default async function DefaultLangDocPage({
  params,
}: {
  params: Promise<{ version: string; slug: string }>;
}) {
  const { version, slug } = await params;
  const doc = getDoc("en", version, slug);

  if (!doc) {
    notFound();
  }

  const headings = getHeadings(doc.content);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <article data-testid="doc-content" className="prose max-w-none dark:prose-invert">
        <h1>{doc.title}</h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2({ children }) {
              const text = extractText(children);
              const id = slugify(text);
              return <h2 id={id}>{children}</h2>;
            },
            h3({ children }) {
              const text = extractText(children);
              const id = slugify(text);
              return <h3 id={id}>{children}</h3>;
            },
            code({ className, children }) {
              const value = Array.isArray(children) ? children.join("") : String(children);
              const isInlineCode = !className && !value.includes("\n");
              if (isInlineCode) {
                return <code className={className}>{children}</code>;
              }
              return <CodeBlock className={className}>{children}</CodeBlock>;
            },
          }}
        >
          {doc.content}
        </ReactMarkdown>

        <FeedbackWidget />
      </article>

      <aside>
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}