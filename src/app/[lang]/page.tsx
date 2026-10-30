import { getLocale } from "@/i18n/get-dictionary";

export default async function HomePage() {
  // Rejects unsupported locales (e.g. /fr) with the localized 404.
  await getLocale();

  return <main id="content" />;
}
