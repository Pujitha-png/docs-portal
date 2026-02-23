import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export const SUPPORTED_LANGS = ["en", "es", "fr", "de"] as const;
export const SUPPORTED_VERSIONS = ["v1", "v2", "v3"] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export type SupportedVersion = (typeof SUPPORTED_VERSIONS)[number];

// Resolve docs root relative to current file to avoid process.cwd() issues with multiple lockfiles
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.join(__dirname, "..", "_docs");

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getDocSlugs(lang: string, version: string): string[] {
  const versionPath = path.join(docsRoot, lang, version);

  if (!fs.existsSync(versionPath)) {
    return [];
  }

  return fs
    .readdirSync(versionPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

export function getDoc(lang: string, version: string, slug: string): {
  content: string;
  title: string;
} | null {
  const filePath = path.join(docsRoot, lang, version, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const title =
    typeof data.title === "string" && data.title.trim().length > 0
      ? data.title
      : slug;

  return { content, title };
}

export function getNavigationForVersion(lang: string, version: string): {
  slug: string;
  title: string;
}[] {
  return getDocSlugs(lang, version)
    .map((slug) => {
      const doc = getDoc(lang, version, slug);
      return {
        slug,
        title: doc?.title ?? slug,
      };
    })
    .filter((item) => item.title.length > 0);
}

export function getSearchIndex(): {
  lang: string;
  version: string;
  slug: string;
  title: string;
  text: string;
}[] {
  const result: {
    lang: string;
    version: string;
    slug: string;
    title: string;
    text: string;
  }[] = [];

  for (const lang of SUPPORTED_LANGS) {
    for (const version of SUPPORTED_VERSIONS) {
      for (const slug of getDocSlugs(lang, version)) {
        const doc = getDoc(lang, version, slug);
        if (!doc) {
          continue;
        }

        result.push({
          lang,
          version,
          slug,
          title: doc.title,
          text: doc.content,
        });
      }
    }
  }

  return result;
}

export function getHeadings(markdownContent: string): { id: string; text: string }[] {
  const lines = markdownContent.split("\n");
  const headings: { id: string; text: string }[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const text = match[2].trim();
    headings.push({ id: slugify(text), text });
  }

  return headings;
}