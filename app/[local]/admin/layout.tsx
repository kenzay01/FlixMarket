"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const params = useParams();
  const locale = params.local || "en";
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <div className="flex h-auto">
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Підтвердження виходу</h2>
            <p className="text-gray-600 mb-6">Ви впевненні що хочете вийти?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                Відмінити
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between align-center p-4 bg-white shadow-xl rounded-md">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">Панель адміністратора</h1>
              <div className="flex gap-4">
                <Link
                  href={`/${locale}/admin`}
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Звіти
                </Link>
                <Link
                  href={`/${locale}/admin/subscriptions`}
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Підписки
                </Link>
              </div>
            </div>
            {session && (
              <div className="flex items-center">
                <span className="mr-4">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => setShowSignOutModal(true)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Вийти
                </button>
              </div>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
