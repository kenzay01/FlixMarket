"use client";

import { useClientTranslation } from "@/app/hooks/useTranslate";
import { signOut, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const params = useParams();
  const router = useRouter();
  const locale = (params.local as "en" | "de" | "ua" | "cz" | "pl") || "en";
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const logOut = useClientTranslation("log_out");
  const cancel = useClientTranslation("cancel");
  const question = useClientTranslation("module_log_out_qestion");
  const exitConfirm = useClientTranslation("exit_confirm");

  // Використовуємо useEffect для перенаправлення
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`);
    }
  }, [status, locale, router]);

  // Показуємо завантаження, поки перевіряється сесія
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Якщо статус не "loading" і не "authenticated", не рендеримо нічого
  if (status !== "authenticated") {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">{exitConfirm}</h2>
            <p className="text-gray-600 mb-6">{question}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                {cancel}
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
              >
                {logOut}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full flex items-end justify-end mb-2">
          <button
            onClick={() => setShowSignOutModal(true)}
            className="text-end px-4 py-2 rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
          >
            {logOut}
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-white shadow rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
