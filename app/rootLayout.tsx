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
  return (
    <Providers>
      <div className="flex flex-col items-center w-full">
        <div className={`w-full px-4 z-50 ${isHomePage ? "" : "mb-26"}`}>
          <Header />
        </div>
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
