"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  version: string;
  docsByVersion: Record<string, { slug: string; title: string }[]>;
  collapseLabel?: string;
  expandLabel?: string;
}

export default function Sidebar({
  version,
  docsByVersion,
  collapseLabel = "Collapse navigation",
  expandLabel = "Expand navigation",
}: SidebarProps) {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lang = parts[1] || "en";
  const currentVersion = parts[3] || version;
  const docs = docsByVersion[currentVersion] || docsByVersion[version] || [];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav data-testid="sidebar" className="space-y-3">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        {collapsed ? expandLabel : collapseLabel}
      </button>

      {!collapsed && (
        <div className="space-y-1.5">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${lang}/docs/${currentVersion}/${doc.slug}`}
              data-testid={`sidebar-nav-link-${doc.slug}`}
              className={`block rounded-md px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                pathname.endsWith(`/${doc.slug}`)
                  ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : ""
              }`}
            >
              {doc.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
