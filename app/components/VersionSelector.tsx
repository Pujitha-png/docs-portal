"use client";

import { useRouter, usePathname } from "next/navigation";

const versions = ["v1", "v2", "v3"];

export default function VersionSelector({
  lang,
  version,
}: {
  lang: string;
  version: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentVersion = parts[3] || version;
  const currentSlug = parts[4] || "introduction";

  const handleChange = (v: string) => {
    router.push(`/${lang}/docs/${v}/${currentSlug}`);
  };

  return (
    <select
      data-testid="version-selector"
      value={currentVersion}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      {versions.map((v) => (
        <option key={v} value={v} data-testid={`version-option-${v}`}>
          {v.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
