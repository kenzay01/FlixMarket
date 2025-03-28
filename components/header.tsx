"use client";

import Link from "next/link";
import { MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import LanguageSwitcher from "./langSwitcher";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import Image from "next/image";
export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const path = usePathname();
  const { data: session } = useSession();
  const pathParts = path.split("/").filter(Boolean);
  const currentLang = ["en", "de", "ua"].includes(pathParts[0])
    ? pathParts[0]
    : "en";
  const isHome = pathParts.length === 1;

  const howItWorks = useClientTranslation("how_it_works");
  const comments = useClientTranslation("comments");
  const faq = useClientTranslation("faq");
  const logIn = useClientTranslation("log_in");
  const logOut = useClientTranslation("log_out");

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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const listOfLinks = [
    { href: `/${currentLang}/faqs`, body: faq, needUnderline: true },
    {
      href: `/${currentLang}/#comments`,
      body: comments,
      needUnderline: true,
    },

    {
      href: `/${currentLang}#how-it-works`,
      body: howItWorks,
      needUnderline: true,
    },

    {
      href: session
        ? session.user.role === "admin"
          ? `/${currentLang}/admin`
          : `/${currentLang}/my-profile`
        : `/${currentLang}/login`,
      body: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <MdAccountCircle className="w-8 h-8 md:w-10 md:h-10" />
            <div className="pt-1 md:pt-0">
              {session ? session.user.name : null}
            </div>
          </div>
          <div className="md:hidden">
            {session ? (
              <button
                onClick={() => {
                  signOut({ callbackUrl: `/${currentLang}` });
                  toggleMenu();
                }}
                className="border-1 border-red-500 px-2 py-1 rounded-md text-red-500 hover:bg-red-500 hover:text-white duration-150 cursor-pointer"
              >
                {logOut}
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push(`/${currentLang}/login`);
                  toggleMenu();
                }}
                className="border-1 border-indigo-500 px-2 py-1 rounded-md text-indigo-500 hover:bg-indigo-500 hover:text-white duration-150 cursor-pointer"
              >
                {logIn}
              </button>
            )}
          </div>
        </div>
      ),
      needUnderline: false,
    },
  ];

  return (
    <>
      <header
        className={`${
          isHome ? "fixed" : "absolute"
        } top-0 left-0 w-full z-10 transition-all duration-300 ${
          scrolled && isHome ? "bg-white shadow-md py-4" : "bg-transparent py-4"
        } ${hidden ? "-translate-y-full" : "translate-y-0"} ${
          isHome ? "" : "shadow-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/EasyPlayLogo.png"
              width={200}
              height={200}
              alt="logo"
              className="w-14 h-14"
            />
            <Link
              href={`/${currentLang}`}
              onClick={setMenuOpen.bind(null, false)}
              className={`flex-1 text-2xl font-bold transition-colors duration-300 ${
                scrolled || !isHome ? "text-gray-800" : "text-white"
              }`}
            >
              EasyPlay
            </Link>
          </div>

          <div className="flex items-center gap-4 md:flex-row-reverse">
            <LanguageSwitcher scrolled={scrolled} />
            <button onClick={toggleMenu} className="text-3xl md:hidden">
              {menuOpen ? (
                <MdClose
                  className={`duration-300 ${
                    scrolled || !isHome ? "text-gray-800" : "text-white"
                  }`}
                />
              ) : (
                <MdMenu
                  className={`duration-300 ${
                    scrolled || !isHome ? "text-gray-800" : "text-white"
                  }`}
                />
              )}
            </button>
            <nav className="hidden md:flex items-center gap-6">
              {listOfLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => {
                    if (link.href.includes("#")) {
                      const hash = link.href.split("#").at(-1);
                      if (hash && document.getElementById(hash)) {
                        document.getElementById(hash)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }
                  }}
                  className={`relative flex items-center gap-1 justify-center transition-colors group ${
                    scrolled || !isHome
                      ? "text-gray-800 hover:text-indigo-600"
                      : "text-white"
                  }`}
                >
                  {link.body}
                  {link.needUnderline && (
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                        scrolled || !isHome ? "bg-indigo-600" : "bg-white"
                      } group-hover:w-full transition-all duration-300 ease-in-out`}
                    ></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <nav
        className={`fixed z-20 top-15 left-0 w-full bg-white shadow-md flex flex-col items-center gap-2 text-lg py-6 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }
          px-4
        `}
      >
        {listOfLinks.reverse().map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={toggleMenu}
            className="text-gray-800 w-full py-2 text-start border-b-1 border-gray-300"
          >
            {link.body}
          </Link>
        ))}
      </nav>
    </>
  );
}
