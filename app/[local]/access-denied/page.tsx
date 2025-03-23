import Link from "next/link";
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

export default function AccessDenied({
  params,
}: {
  params: { locale: "en" | "de" };
}) {
  const locale = params.locale || "en";
  const t = translations[locale];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{t.title}</h1>
        <p className="text-gray-600 mb-6">{t.message}</p>
        <Link
          href={`/${locale}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
