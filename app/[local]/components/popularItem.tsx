"use client";
import type { Subscription } from "../../../types/subscriptions";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useRouter, useParams } from "next/navigation";
export default function PopularItem({
  item,
  index,
}: {
  item: Subscription;
  index: number;
}) {
  const router = useRouter();
  const params = useParams();
  const locale = (params.local as "en" | "de") || "en";

  const isEven = index % 2 === 0;
  const btnTitle = useClientTranslation("buy_now");

  const displayTitle = locale === "en" ? item.title : item.title_de;
  const displayDescription =
    locale === "en" ? item.description : item.description_de;
  const displayBenefits =
    locale === "en" ? item.benefitsList : item.benefitsList_de;
  const monthsText = useClientTranslation("months").toLowerCase();

  return (
    <section
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } justify-between bg-white md:p-6 gap-8`}
    >
      <motion.div
        className="w-full md:w-1/2 pt-8"
        initial={{ opacity: 0, x: isEven ? 150 : -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="w-full h-48 bg-gray-800"></div>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 p-6"
        initial={{ opacity: 0, x: isEven ? 200 : -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">{displayTitle}</h3>
        <p className="text-gray-700 mb-4">{displayDescription}</p>
        <ul className="list-none space-y-2 text-gray-600">
          {displayBenefits?.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <FaCheck className="text-green-500" /> {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center space-x-4">
          <span className="text-pink-600 text-2xl font-bold">
            {locale === "en"
              ? "$" + item.price_per_3months
              : "€" + item.price_per_3months_eu}{" "}
            / 3 {monthsText}
          </span>
        </div>

        <button
          onClick={() => {
            router.push(`/${locale}/item${item.id}`);
          }}
          className="mt-4 px-6 py-2 bg-indigo-600 border-2 border-indigo-600 text-white text-lg rounded-3xl hover:bg-transparent transition hover:text-indigo-600 cursor-pointer"
        >
          {btnTitle}
        </button>
      </motion.div>
    </section>
  );
}
