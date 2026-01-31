import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const revalidate = 60;

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "_docs");
  const langs = fs.readdirSync(docsDir);

  const params: { lang: string; version: string; slug: string }[] = [];

  langs.forEach((lang) => {
    const versions = fs.readdirSync(path.join(docsDir, lang));

    versions.forEach((version) => {
      const files = fs.readdirSync(path.join(docsDir, lang, version));

      files.forEach((file) => {
        params.push({
          lang,
          version,
          slug: file.replace(".md", ""),
        });
      });
    });
  });

  return params;
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ lang: string; version: string; slug: string }>;
}) {
  const { lang, version, slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "_docs",
    lang,
    version,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <div className="p-10 text-red-600">❌ Document not found</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return (
    <div data-testid="doc-content" className="prose max-w-none">
      <h1>{data.title || slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </div>
  );
}
