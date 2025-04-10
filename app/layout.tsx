// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootLayoutExtanded from "./rootLayout";
import LanguageRedirect from "@/components/languageRedirect";
import { AppProvider } from "../context/AppContext"; // Імпортуємо AppProvider
// import { Providers } from "./providers"; // Імпортуємо Providers
// import { SessionProvider } from "next-auth/react"; // Імпортуємо SessionProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyPlay - Affordable Premium Subscriptions",
  description:
    "Easy Play is a reliable online subscription store offering access to popular services at discounted prices. Get movies, TV, music, VPN and more since 2021.",
  keywords:
    "subscription store, discounted subscriptions, online services, premium accounts, streaming services, VPN services, affordable subscriptions",

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },

  openGraph: {
    title: "EasyPlay - Affordable Premium Subscriptions",
    description:
      "Easy Play is a reliable online subscription store offering access to popular services at discounted prices. Get movies, TV, music, VPN and more since 2021.",
    url: "https://easyplay.com",
    siteName: "EasyPlay",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EasyPlay - Affordable Premium Subscriptions",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EasyPlay - Affordable Premium Subscriptions",
    description:
      "Easy Play is a reliable online subscription store offering access to popular services at discounted prices. Get movies, TV, music, VPN and more since 2021.",
    images: ["/twitter-image.jpg"],
    creator: "@easyplaystore",
  },

  alternates: {
    canonical: "https://easyplay.com",
    languages: {
      "en-US": "https://easyplay.com/en",
      "uk-UA": "https://easyplay.com/ua",
      "de-DE": "https://easyplay.com/de",
    },
  },

  category: "E-commerce",
  verification: {
    google: "google-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <LanguageRedirect />
        <AppProvider>
          <RootLayoutExtanded>{children}</RootLayoutExtanded>
        </AppProvider>
      </body>
    </html>
  );
}
