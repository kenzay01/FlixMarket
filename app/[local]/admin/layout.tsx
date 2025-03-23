"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Словник для локалізації
const translations = {
  en: {
    adminPanel: "Admin Panel",
    home: "Home",
    users: "Users",
    settings: "Settings",
    reports: "Reports",
    logout: "Logout",
  },
  de: {
    adminPanel: "Admin-Panel",
    home: "Startseite",
    users: "Benutzer",
    settings: "Einstellungen",
    reports: "Berichte",
    logout: "Abmelden",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const params = useParams();
  const locale = (params.locale as "en" | "de") || "en";
  const t = translations[locale];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">{t.adminPanel}</div>
        <nav className="mt-6">
          <Link
            href={`/${locale}/admin`}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/admin/users`}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {t.users}
          </Link>
          <Link
            href={`/${locale}/admin/settings`}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {t.settings}
          </Link>
          <Link
            href={`/${locale}/admin/reports`}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {t.reports}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t.adminPanel}</h1>
          {session && (
            <div className="flex items-center">
              <span className="mr-4">
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t.logout}
              </button>
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
