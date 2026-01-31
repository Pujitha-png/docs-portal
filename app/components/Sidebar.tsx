"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  version: string;
  docs: { slug: string; title: string }[];
}

export default function Sidebar({ version, docs }: SidebarProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";

  return (
    <nav data-testid="sidebar-navigation" className="space-y-2">
      {docs.map((doc) => (
        <Link
          key={doc.slug}
          href={`/${lang}/${version}/${doc.slug}`}
          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition font-medium ${
            pathname.endsWith(doc.slug)
              ? "bg-indigo-100 text-indigo-700"
              : ""
          }`}
        >
          📘 {doc.title}
        </Link>
      ))}
    </nav>
  );
}
