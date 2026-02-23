import SwaggerClient from "../../components/SwaggerClient";
import { getUiTranslations } from "../../../lib/i18n";

export default async function LocalizedApiReferencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const ui = getUiTranslations(lang);

  return (
    <main className="p-2">
      <h1 className="mb-4 text-2xl font-bold">{ui.apiReference}</h1>
      <SwaggerClient />
    </main>
  );
}