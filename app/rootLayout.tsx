"use client";

import Header from "../components/header";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import Footer from "../components/footer";
export default function RootLayoutExtanded({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const isHomePage = pathParts.length === 1;
  const isAdminPanel = pathname.includes("/admin");

  return (
    <Providers>
      <div className="flex flex-col items-center w-full">
        <div
          className={`w-full px-4 z-50 ${isHomePage ? "" : " mb-16 md:mb-18"}`}
        >
          <Header />
        </div>
        <main className="w-full">{children}</main>
        {isAdminPanel ? null : <Footer />}
      </div>
    </Providers>
  );
}
