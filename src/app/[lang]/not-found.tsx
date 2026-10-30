import { NotFoundView } from "@/components/layout/NotFoundView";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";

export default async function LocaleNotFound() {
  const [dictionary, locale] = await Promise.all([getDictionary(), resolveLocale()]);
  return <NotFoundView copy={dictionary.notFound} locale={locale} />;
}
