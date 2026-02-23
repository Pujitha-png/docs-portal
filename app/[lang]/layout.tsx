import LanguageSwitcher from "../components/LanguageSwitcher";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import VersionSelector from "../components/VersionSelector";
import {
  SUPPORTED_LANGS,
  SUPPORTED_VERSIONS,
  getNavigationForVersion,
  getSearchIndex,
} from "../../lib/docs";
import { getUiTranslations } from "../../lib/i18n";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const safeLang = SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])
    ? lang
    : "en";

  // Build docs for all versions - Sidebar will select the correct one based on pathname
  const docsByVersion = Object.fromEntries(
    SUPPORTED_VERSIONS.map((version) => [version, getNavigationForVersion(safeLang, version)])
  );
  const searchItems = getSearchIndex();
  const ui = getUiTranslations(safeLang);

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
      <aside className="hidden w-72 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
        <Sidebar
          docsByVersion={docsByVersion}
          version="v1"
          collapseLabel={ui.collapseNavigation}
          expandLabel={ui.expandNavigation}
        />
      </aside>

      <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <header className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
          <LanguageSwitcher />
          <VersionSelector lang={safeLang} version="v1" />
          <ThemeSwitcher darkLabel={ui.darkMode} lightLabel={ui.lightMode} />
          <div className="w-full sm:w-auto sm:flex-1">
            <SearchBox items={searchItems} placeholder={ui.searchPlaceholder} noResultsLabel={ui.noResults} />
          </div>
        </header>

        {children}
      </main>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}
