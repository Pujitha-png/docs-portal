"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      data-testid="theme-switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-3 py-1.5 border rounded-lg text-sm hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
