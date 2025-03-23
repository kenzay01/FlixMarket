"use client";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
export default function MyProfileLayout() {
  const params = useParams();
  const locale = (params.locale as "en" | "de") || "en";
  return (
    <div>
      MyProfileLayout
      <button
        onClick={() => signOut({ callbackUrl: `/${locale}` })}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign out
      </button>
    </div>
  );
}
