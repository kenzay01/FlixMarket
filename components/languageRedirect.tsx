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
      if (storedLocale !== currentPathLocale) {
        window.location.href = `/${storedLocale}`;
      }
      return;
    }
    const detectLanguage = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Геолокація не вдалася");

        const data = await response.json();
        const country = data.country_code;
        const detectedLocale = COUNTRY_TO_LOCALE[country] || "en";

        localStorage.setItem("language", detectedLocale);
        if (detectedLocale !== currentPathLocale) {
          window.location.href = `/${detectedLocale}`;
        }
      } catch (error) {
        console.warn("Помилка геолокації:", error);
        localStorage.setItem("language", "en");
      }
    };

    detectLanguage();
  }, []);

  return null;
};

export default LanguageRedirect;
