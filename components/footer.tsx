"use client";
import { useClientTranslation } from "@/app/hooks/useTranslate";

// import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as "en" | "de" | "ua" | "cz" | "pl";
  const termsTitle = useClientTranslation("term_conditions");
  const supportTitle = useClientTranslation("support");
  const socials = [
    // {
    //   name: "Facebook",
    //   link: "",
    //   icon: <FaFacebookF className="w-4 h-4" />,
    //   colorBackground: "bg-indigo-950",
    // },
    // {
    //   name: "Instagram",
    //   link: "",
    //   icon: <FaInstagram className="w-4 h-4" />,
    //   colorBackground: "bg-amber-800",
    // },
    {
      name: "Telegram",
      link: "https://t.me/FlixMarketBot",
      icon: <FaTelegramPlane className="w-4 h-4" />,
      colorBackground: "bg-indigo-900",
    },
  ];
  return (
    <footer className="w-full border-t-2 border-gray-200 flex h-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row w-full p-6 gap-1">
        <section className="flex-6 flex flex-col gap-2">
          <h1 className="text-gray-500 text-center md:text-start">
            © EasyPlay 2025
          </h1>
          {/* <div className="flex flex-col text-center md:text-start">
            <a href="" className="text-indigo-600">
              info@gmail.com
            </a>
            <a href="" className="text-indigo-600">
              +380 23 356 12 12
            </a>
          </div> */}
        </section>
        <section className="flex-4 flex flex-col md:flex-row justify-between content-start">
          <div className="flex flex-col gap-0.5 text-center md:text-start">
            <Link
              href={
                locale === "en"
                  ? "/en/terms"
                  : locale === "ua"
                  ? "/ua/terms"
                  : "/de/terms"
              }
              className="text-indigo-600 "
            >
              {termsTitle}
            </Link>
            <a href="https://t.me/kinomanage" className="text-indigo-600 ">
              {supportTitle}
            </a>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-4">
              <FaCcVisa className="w-9 h-9 text-gray-500" />
              <FaCcMastercard className="w-9 h-9 text-gray-500" />
              <FaCcApplePay className="w-9 h-9 text-gray-500" />
            </div>
            <div className="flex gap-2 items-center justify-center">
              {socials.map((social) => {
                return (
                  <a
                    href={social.link}
                    key={social.name}
                    className={`p-2 border-1 border-gray-600 rounded-4xl ${
                      social.name === "Instagram"
                        ? "hover:bg-amber-800"
                        : social.name === "Facebook"
                        ? "hover:bg-indigo-950"
                        : "hover:bg-indigo-800"
                    } hover:text-white ease-in-out duration-200 cursor-pointer`}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
