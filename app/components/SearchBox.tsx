"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchItem = {
  lang: string;
  version: string;
  slug: string;
  title: string;
  text: string;
};

export default function SearchBox({
  items,
  placeholder = "Search documentation",
  noResultsLabel = "No results found.",
}: {
  items: SearchItem[];
  placeholder?: string;
  noResultsLabel?: string;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [] as SearchItem[];
    }

    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.text}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [query, items]);

  return (
    <div className="relative w-full">
      <input
        data-testid="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      {query.trim() && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {results.length > 0 ? (
            <div data-testid="search-results" className="space-y-1">
              {results.map((result) => (
                <Link
                  key={`${result.lang}-${result.version}-${result.slug}`}
                  href={`/${result.lang}/docs/${result.version}/${result.slug}`}
                  className="block rounded-md px-2 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="font-medium">{result.title}</span>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-300">
                    {result.lang.toUpperCase()} • {result.version.toUpperCase()}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p data-testid="search-no-results" className="text-sm text-slate-600 dark:text-slate-300">
              {noResultsLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}