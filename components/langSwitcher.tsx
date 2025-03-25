"use client";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage =
    pathname === "/en" || pathname === "/de" || pathname === "/ua";
  const currentLocale = pathname.split("/")[1];

  const locales = [
    { code: "en", name: "En" },
    { code: "de", name: "De" },
    { code: "ua", name: "Ua" },
  ];

  const switchLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.replace(/^\/(en|de|ua)/, "")}`;
    router.push(newPath);
  };

  return (
    <div>
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value)}
        className={`px-2 py-1 rounded transition-colors group cursor-pointer outline-0 text-gray-800 ${
          scrolled || !isHomePage ? "bg-transparent" : " bg-white"
        }`}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
    </div>
  );
}
