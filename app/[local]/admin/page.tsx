import AdminCheck from "../../../components/adminCheck";

// Словник для локалізації
const translations = {
  en: {
    title: "Admin Dashboard",
    users: "Users",
    usersDescription: "Manage system users",
    settings: "Settings",
    settingsDescription: "System configuration",
    reports: "Reports",
    reportsDescription: "Analytics and statistics",
    goTo: "Go to",
  },
  de: {
    title: "Admin-Dashboard",
    users: "Benutzer",
    usersDescription: "Systembenutzer verwalten",
    settings: "Einstellungen",
    settingsDescription: "Systemkonfiguration",
    reports: "Berichte",
    reportsDescription: "Analytik und Statistik",
    goTo: "Gehe zu",
  },
};

export default function AdminDashboard({
  params,
}: {
  params: { locale: "en" | "de" };
}) {
  const locale = params.locale || "en";
  const t = translations[locale];

  return (
    <AdminCheck>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{t.users}</h2>
            <p className="text-gray-600">{t.usersDescription}</p>
            <div className="mt-4">
              <a
                href={`/${locale}/admin/users`}
                className="text-blue-600 hover:underline"
              >
                {t.goTo} →
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{t.settings}</h2>
            <p className="text-gray-600">{t.settingsDescription}</p>
            <div className="mt-4">
              <a
                href={`/${locale}/admin/settings`}
                className="text-blue-600 hover:underline"
              >
                {t.goTo} →
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{t.reports}</h2>
            <p className="text-gray-600">{t.reportsDescription}</p>
            <div className="mt-4">
              <a
                href={`/${locale}/admin/reports`}
                className="text-blue-600 hover:underline"
              >
                {t.goTo} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminCheck>
  );
}
