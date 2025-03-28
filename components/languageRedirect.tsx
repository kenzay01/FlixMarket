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
    if (typeof window !== "undefined" && !localStorage.getItem("language")) {
      const detectLanguage = async () => {
        try {
          let language;
          const response = await fetch("https://ipapi.co/json/");

          if (!response.ok) {
            throw new Error("Геолокація не вдалася");
          }

          const data = await response.json();
          const country = data.country_code;

          if (country && COUNTRY_TO_LOCALE[country]) {
            language = COUNTRY_TO_LOCALE[country];
            console.log("language 2", language);
          }
          localStorage.setItem("language", language as Locale);
          window.location.href = `/${language}`;
        } catch (error) {
          console.warn("Помилка геолокації:", error);
        }
      };

      detectLanguage();
    }
  }, []);

  return null;
};

export default LanguageRedirect;
