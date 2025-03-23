"use client";

import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import LanguageSwitcher from "./langSwitcher";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const path = usePathname();
  const { data: session } = useSession();
  const pathParts = path.split("/").filter(Boolean);
  const currentLang = ["en", "de"].includes(pathParts[0]) ? pathParts[0] : "en";
  const isHome = pathParts.length === 1;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const listOfLink = [
    { href: "/", body: "Test", needUnderline: true },
    {
      href: session
        ? session.user.role === "admin"
          ? `/${currentLang}/admin`
          : `/${currentLang}/my-profile`
        : `/${currentLang}/login`,
      body: (
        <>
          <MdAccountCircle className="w-12 h-12 pl-3.5" />
          <div>{session ? session.user.name : null}</div>
        </>
      ),
      needUnderline: false,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      } ${hidden ? "-translate-y-full" : "translate-y-0"} ${
        isHome ? "" : "shadow-md"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link
          href={`/${currentLang}`}
          className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled || !isHome ? "text-gray-800" : "text-white"
          }`}
        >
          FlixMarket
        </Link>

        <div className="flex items-center gap-4">
          {listOfLink.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className={`
                  relative
                  flex items-center gap-1 
                  justify-center
                  duration-300 
                  transition-colors
                  group
                  ${
                    scrolled || !isHome
                      ? "text-gray-800 hover:text-indigo-600 "
                      : "text-white"
                  }
                `}
              >
                {link.body}
                {link.needUnderline ? (
                  <>
                    <span
                      className={`
                  absolute -bottom-1 left-0
                  w-0 h-0.5
                  ${scrolled || !isHome ? "bg-indigo-600" : "bg-white"}
                  group-hover:w-full
                  transition-all duration-300 ease-in-out
                `}
                    ></span>
                  </>
                ) : null}
              </Link>
            );
          })}

          <LanguageSwitcher scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
