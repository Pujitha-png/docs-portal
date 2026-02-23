import fs from "node:fs";
import path from "node:path";

export type UiTranslations = {
  title: string;
  documentation: string;
  introduction: string;
  gettingStarted: string;
  apiReference: string;
  theme: string;
  searchPlaceholder: string;
  noResults: string;
  onThisPage: string;
  feedbackLabel: string;
  feedbackPlaceholder: string;
  feedbackSubmit: string;
  feedbackSuccess: string;
  darkMode: string;
  lightMode: string;
  collapseNavigation: string;
  expandNavigation: string;
};

const localesRoot = path.join(process.cwd(), "public", "locales");

const fallback: UiTranslations = {
  title: "📚 Docs Portal",
  documentation: "Documentation",
  introduction: "Introduction",
  gettingStarted: "Getting Started",
  apiReference: "API Reference",
  theme: "Theme",
  searchPlaceholder: "Search documentation",
  noResults: "No results found.",
  onThisPage: "On this page",
  feedbackLabel: "Feedback",
  feedbackPlaceholder: "Your feedback...",
  feedbackSubmit: "Submit",
  feedbackSuccess: "Thanks for your feedback.",
  darkMode: "Dark mode",
  lightMode: "Light mode",
  collapseNavigation: "Collapse navigation",
  expandNavigation: "Expand navigation",
};

export function getUiTranslations(lang: string): UiTranslations {
  const filePath = path.join(localesRoot, lang, "common.json");

  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<UiTranslations>;
    return {
      ...fallback,
      ...parsed,
    };
  } catch {
    return fallback;
  }
}