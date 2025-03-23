import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      link: "",
      icon: <FaFacebookF className="w-4 h-4" />,
      colorBackground: "bg-blue-950",
    },
    {
      name: "Instagram",
      link: "",
      icon: <FaInstagram className="w-4 h-4" />,
      colorBackground: "bg-amber-800",
    },
    {
      name: "Telegram",
      link: "",
      icon: <FaTelegramPlane className="w-4 h-4" />,
      colorBackground: "bg-blue-900",
    },
  ];
  return (
    <footer className="w-full border-t-2 border-gray-200 flex h-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row w-full p-6 gap-1.5">
        <section className="flex-6 flex flex-col gap-2">
          <h1 className="text-gray-500 text-center md:text-start">
            © Play Music. YouTube Premium, Spotify Premium, Netflix and Apple
            Music. YouTube Premium, Spotify Premium, Apple Music Family
            Subscription
          </h1>
          <div className="flex flex-col text-center md:text-start">
            <a href="" className="text-indigo-600">
              info@gmail.com
            </a>
            <a href="" className="text-indigo-600">
              +380 23 356 12 12
            </a>
          </div>
        </section>
        <section className="flex-4 flex flex-col md:flex-row justify-between content-start">
          <div className="flex flex-col gap-0.5 text-center md:text-start">
            <a href="" className="text-indigo-600">
              Що тут треба
            </a>
            <a href="" className="text-indigo-600">
              Тест
            </a>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-end pt-6">
            <div className="flex gap-4 md:pr-4">
              <FaCcVisa className="w-9 h-9 text-gray-500" />
              <FaCcMastercard className="w-9 h-9 text-gray-500" />
            </div>
            <div className="flex gap-2">
              {socials.map((social) => {
                return (
                  <div
                    key={social.name}
                    className={`p-2 border-1 border-gray-600 rounded-4xl ${
                      social.name === "Instagram"
                        ? "hover:bg-amber-800"
                        : social.name === "Facebook"
                        ? "hover:bg-blue-950"
                        : "hover:bg-blue-800"
                    } hover:text-white ease-in-out duration-200 cursor-pointer`}
                  >
                    {social.icon}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
