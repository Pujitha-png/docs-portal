"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher({
  darkLabel = "Dark mode",
  lightLabel = "Light mode",
}: {
  darkLabel?: string;
  lightLabel?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
      return;
    }

    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme && theme !== null) {
      applyTheme(theme);
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  function applyTheme(themeValue: "light" | "dark") {
    const root = window.document.documentElement;
    if (themeValue === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (theme === null) {
    return (
      <button type="button" disabled className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
        Loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "light" ? darkLabel : lightLabel}
    </button>
  );
}
