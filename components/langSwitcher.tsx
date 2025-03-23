"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  console.log("scrolled", scrolled);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/en" || pathname === "/de";
  const currentLocale = pathname.split("/")[1];

  const switchLanguage = () => {
    const currentLocale = pathname.split("/")[1];
    const newLocale = currentLocale === "de" ? "en" : "de";

    const newPath = `/${newLocale}${pathname.replace(/^\/(en|de)/, "")}`;
    router.push(newPath);
  };

  return (
    <div>
      <button
        onClick={switchLanguage}
        className={`px-2 py-1 rounded ease-in-out transition-colors cursor-pointer ${
          scrolled || !isHomePage
            ? "text-gray-800 hover:bg-indigo-600 hover:text-white"
            : "text-white"
        }`}
      >
        {currentLocale === "en" ? "DE" : "EN"}
      </button>
    </div>
  );
}
