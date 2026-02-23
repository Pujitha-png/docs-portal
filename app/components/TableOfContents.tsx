"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({
  headings,
  title = "On this page",
}: {
  headings: { id: string; text: string }[];
  title?: string;
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((value): value is HTMLElement => Boolean(value));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <nav data-testid="table-of-contents" className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-100">{title}</p>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              data-testid={`toc-link-${heading.id}`}
              data-active={activeId === heading.id ? "true" : "false"}
              className={
                activeId === heading.id
                  ? "block rounded px-2 py-1 font-semibold text-slate-900 underline dark:text-slate-100"
                  : "block rounded px-2 py-1 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}