"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const translations = {
  en: {
    title: "Access Denied",
    message:
      "You do not have permission to access this page. Only administrators can view this section.",
    backToHome: "Back to Home",
  },
  de: {
    title: "Zugriff verweigert",
    message:
      "Sie haben keine Berechtigung, auf diese Seite zuzugreifen. Nur Administratoren können diesen Abschnitt anzeigen.",
    backToHome: "Zurück zur Startseite",
  },
};

type LocaleKey = keyof typeof translations;

export default function AccessDenied() {
  const params = useParams();
  const locale = ((params.local as string) || "en") as LocaleKey;
  const t = translations[locale] || translations.en;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">{t.title}</h1>
        <p className="mb-6 text-gray-700">{t.message}</p>
        <Link href="/" className="text-indigo-500 hover:underline">
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
