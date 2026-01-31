"use client";

import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    const parts = pathname.split("/");
    parts[1] = lang; // replace current language
    router.push(parts.join("/"));
  };

  return (
    <div
      data-testid="language-switcher"
      className="flex gap-3 border p-2 rounded w-fit"
    >
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          className="text-sm underline"
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
