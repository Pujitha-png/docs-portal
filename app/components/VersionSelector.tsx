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

  const handleChange = (v: string) => {
    const parts = pathname.split("/").slice(3); 
    router.push(`/${lang}/${v}/${parts.join("/") || "introduction"}`);
  };

  return (
    <select
      data-testid="version-selector"
      value={version}
      onChange={(e) => handleChange(e.target.value)}
      className="border px-2 py-1 rounded"
    >
      {versions.map((v) => (
        <option key={v} value={v}>
          {v.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
