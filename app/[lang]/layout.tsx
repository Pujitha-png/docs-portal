"use client";

import fs from "fs";
import path from "path";
import Sidebar from "../components/Sidebar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import VersionSelector from "../components/VersionSelector";

interface LangLayoutProps {
  children: React.ReactNode;
  params: { lang: string; version?: string };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang, version = "v1" } = params;

  const docsPath = path.join(process.cwd(), "_docs", lang, version);

  let docs: string[] = [];
  if (fs.existsSync(docsPath)) {
    docs = fs
      .readdirSync(docsPath)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 bg-white dark:bg-slate-800">
        <Sidebar docs={docs.map((slug) => ({ slug, title: slug }))} lang={lang} version={version} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <VersionSelector lang={lang} version={version} />
          <ThemeSwitcher />
        </header>

        {children}
      </main>
    </div>
  );
}
