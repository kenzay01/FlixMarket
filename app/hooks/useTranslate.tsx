"use client";

import en from "../locales/en.json";
import de from "../locales/de.json";
import { useParams } from "next/navigation";

const translations: Record<string, typeof en> = { en, de };
export function getTranslation(
  key: keyof typeof en,
  locale: keyof typeof translations
): string {
  return translations[locale]?.[key] || key;
}

export function useClientTranslation(key: keyof typeof en): string {
  const params = useParams();
  const locale = params?.local as keyof typeof translations;
  if (!locale || !translations[locale]) {
    console.warn(`Locale '${locale}' не знайдено, повертаємо ключ: "${key}".`);
    return key;
  }

  return getTranslation(key, locale);
}
