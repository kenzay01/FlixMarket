// "use client";

// import { useEffect } from "react";
// type Locale = "en" | "ua" | "de";

// const COUNTRY_TO_LOCALE: Record<string, Locale> = {
//   UA: "ua",
//   US: "en",
//   GB: "en",
//   DE: "de",
// };

// const LanguageRedirect = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const locale = window.location.pathname.split("/")[1] || "en";
//       const storageLocale = localStorage.getItem("language");

//       if (!storageLocale) {
//         const detectLanguage = async () => {
//           try {
//             const response = await fetch("https://ipapi.co/json/");
//             if (!response.ok) throw new Error("Геолокація не вдалася");

//             const data = await response.json();
//             const country = data.country_code;
//             const language = COUNTRY_TO_LOCALE[country] || "en";

//             localStorage.setItem("language", language);
//             window.location.href = `/${language}`;
//           } catch (error) {
//             console.warn("Помилка геолокації:", error);
//           }
//         };

//         detectLanguage();
//       }
//       if (storageLocale !== locale) {
//         window.location.href = `/${localStorage.getItem("language")}`;
//       }
//     }
//   }, []);

//   return null;
// };

// export default LanguageRedirect;

"use client";

import { useEffect } from "react";

type Locale = "en" | "ua" | "de";

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  UA: "ua",
  US: "en",
  GB: "en",
  DE: "de",
};

const LanguageRedirect = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPathLocale = window.location.pathname.split("/")[1] || "en";
    const storedLocale = localStorage.getItem("language") as Locale | null;

    if (storedLocale) {
      // Якщо у localStorage вже є мова, але вона відрізняється від поточної в URL
      if (storedLocale !== currentPathLocale) {
        window.location.href = `/${storedLocale}`;
      }
      return;
    }

    // Якщо в localStorage немає мови, визначаємо за IP
    const detectLanguage = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Геолокація не вдалася");

        const data = await response.json();
        const country = data.country_code;
        const detectedLocale = COUNTRY_TO_LOCALE[country] || "en";

        localStorage.setItem("language", detectedLocale);

        // Перенаправляємо тільки якщо виявлена мова відрізняється від поточної
        if (detectedLocale !== currentPathLocale) {
          window.location.href = `/${detectedLocale}`;
        }
      } catch (error) {
        console.warn("Помилка геолокації:", error);
        // Встановлюємо англійську як мову за замовчуванням у разі помилки
        localStorage.setItem("language", "en");
      }
    };

    detectLanguage();
  }, []);

  return null;
};

export default LanguageRedirect;
