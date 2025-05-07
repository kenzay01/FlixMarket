"use client";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage =
    pathname === "/en" ||
    pathname === "/de" ||
    pathname === "/ua" ||
    pathname === "/cz" ||
    pathname === "/pl";
  const currentLocale = pathname.split("/")[1];

  const locales = [
    { code: "en", name: "EN" },
    { code: "de", name: "DE" },
    { code: "ua", name: "UA" },
    { code: "cz", name: "CZ" },
    { code: "pl", name: "PL" },
  ];

  const switchLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.replace(
      /^\/(en|de|ua|cz|pl)/,
      ""
    )}`;
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
