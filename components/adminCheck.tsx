"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function AdminCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "en";

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(`/${locale}/login`);
    } else if (session.user.role !== "admin") {
      router.push(`/${locale}/access-denied`);
    }
  }, [session, status, router, locale]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
