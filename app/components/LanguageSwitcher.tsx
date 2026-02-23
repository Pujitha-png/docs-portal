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
    
    // Check if we're on a docs page
    if (parts[2] === "docs" && parts[3] && parts[4]) {
      const version = parts[3];
      const slug = parts[4];
      // Navigate to the same version and slug in the new language
      router.push(`/${lang}/docs/${version}/${slug}`);
    } else if (parts[2] === "api-reference") {
      // Navigate to API reference in the new language
      router.push(`/${lang}/api-reference`);
    } else {
      // Default: navigate to the docs home for the new language
      router.push(`/${lang}/docs/v1/introduction`);
    }
  };

  const getCurrentLang = () => {
    const parts = pathname.split("/");
    return parts[1] || "en";
  };

  const currentLang = getCurrentLang();

  return (
    <div
      data-testid="language-switcher"
      className="flex w-fit items-center gap-1 rounded-md border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
    >
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          disabled={l.code === currentLang}
          className={`text-sm ${
            l.code === currentLang
              ? "cursor-default rounded px-2 py-1 font-semibold text-slate-900 dark:text-slate-100"
              : "rounded px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
