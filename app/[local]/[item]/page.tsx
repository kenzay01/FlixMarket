"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import type { Subscription } from "../../../types/subscriptions";
import { useSubscriptions } from "@/context/hooks";

export default function ItemPage() {
  const { subscriptions } = useSubscriptions();
  const params = useParams();
  const router = useRouter();
  const locale = params.local as string;
  const itemId = params.item as string;
  const subscription = subscriptions.find(
    (sub) => sub.id === itemId.replace("item", "")
  );

  const buyNowText = useClientTranslation("buy_now");
  const monthsText = useClientTranslation("months");
  const selectPlanText = useClientTranslation("select_plan");
  const backText = useClientTranslation("back");
  const featuresText = useClientTranslation("features") || "Features";

  const [selectedPlan, setSelectedPlan] = useState<"1" | "3" | "6" | "12">("1");

  const getLocalizedContent = (field: string, fallback: string) => {
    if (!subscription) return fallback;

    return locale === "de" && subscription[`${field}_de` as keyof Subscription]
      ? subscription[`${field}_de` as keyof Subscription]
      : locale === "ua" && subscription[`${field}_ua` as keyof Subscription]
      ? subscription[`${field}_ua` as keyof Subscription]
      : subscription[field as keyof Subscription];
  };

  const getBenefitsList = () => {
    if (!subscription) return [];
    return locale === "de"
      ? subscription.benefitsList_de
      : locale === "ua"
      ? subscription.benefitsList_ua
      : subscription.benefitsList;
  };

  const getMonthPicker = () => {
    if (!subscription) return [];

    const monthTermin = [];
    const isEuro = locale === "de";
    const isUa = locale === "ua";

    const priceForMonth = isEuro
      ? subscription.price_per_month_eu
      : isUa
      ? subscription.price_per_month_ua
      : subscription.price_per_month;

    const priceFor3Months = isEuro
      ? subscription.price_per_3months_eu
      : isUa
      ? subscription.price_per_3months_ua
      : subscription.price_per_3months;

    const priceFor6Months = isEuro
      ? subscription.price_per_6months_eu
      : isUa
      ? subscription.price_per_6months_ua
      : subscription.price_per_6months;

    const priceFor12Months = isEuro
      ? subscription.price_per_12months_eu
      : isUa
      ? subscription.price_per_12months_ua
      : subscription.price_per_12months;

    if (priceForMonth > 0) {
      monthTermin.push("1");
    }

    if (priceFor3Months > 0) {
      monthTermin.push("3");
    }

    if (priceFor6Months > 0) {
      monthTermin.push("6");
    }

    if (priceFor12Months > 0) {
      monthTermin.push("12");
    }

    if (monthTermin.length > 0 && !monthTermin.includes(selectedPlan)) {
      setSelectedPlan(monthTermin[0] as "1" | "3" | "6" | "12");
    }

    return monthTermin;
  };

  const handlePurchase = () => {
    console.log(
      `Purchasing ${selectedPlan} month plan for ${getLocalizedContent(
        "title",
        ""
      )}`
    );
    // router.push(`/${locale}/checkout?plan=${selectedPlan}&item=${itemId}`);
  };

  const getPriceForSelectedPlan = () => {
    if (!subscription) return 0;

    const isEuro = locale === "de";
    const isUa = locale === "ua";

    switch (selectedPlan) {
      case "1":
        return isEuro
          ? subscription.price_per_month_eu
          : isUa
          ? subscription.price_per_month_ua
          : subscription.price_per_month;
      case "3":
        return isEuro
          ? subscription.price_per_3months_eu
          : isUa
          ? subscription.price_per_3months_ua
          : subscription.price_per_3months;
      case "6":
        return isEuro
          ? subscription.price_per_6months_eu
          : isUa
          ? subscription.price_per_6months_ua
          : subscription.price_per_6months;
      case "12":
        return isEuro
          ? subscription.price_per_12months_eu
          : isUa
          ? subscription.price_per_12months_ua
          : subscription.price_per_12months;
      default:
        return isEuro
          ? subscription.price_per_3months_eu
          : isUa
          ? subscription.price_per_3months_ua
          : subscription.price_per_3months;
    }
  };

  const getCurrencySymbol = () => {
    return locale === "de" ? "€" : locale === "ua" ? "₴" : "$";
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-96">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  //       <span className="ml-3">{loadingText}</span>
  //     </div>
  //   );
  // }

  if (!subscription) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <button
            onClick={() => router.push(`/${locale}`)}
            className="mt-4 flex items-center gap-2 mx-auto px-6 py-2 bg-indigo-600 text-white rounded-3xl cursor-pointer hover:bg-indigo-700 transition"
          >
            <FaArrowLeft /> {backText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto pt-8 pb-16 px-4">
      <button
        onClick={() => router.push(`/${locale}`)}
        className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
      >
        <FaArrowLeft /> {backText}
      </button>

      <div className="bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <motion.div
            className="w-full lg:w-1/2 p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {subscription.imageUrl ? (
              <img src={subscription.imageUrl} alt="" className="max-w-2xl" />
            ) : (
              <div className="bg-gray-800 h-80 w-full rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">
                  {getLocalizedContent("title", "")}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 p-6 lg:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-4">
              {getLocalizedContent("title", "")}
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              {getLocalizedContent("description", "")}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{selectPlanText}:</h3>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {getMonthPicker()?.map((months) => (
                  <button
                    key={months}
                    onClick={() =>
                      setSelectedPlan(months as "1" | "3" | "6" | "12")
                    }
                    className={`px-3 py-1.5 md:px-6 md:py-3 rounded-full border-2 transition-all cursor-pointer ${
                      selectedPlan === months
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 hover:border-indigo-600 text-gray-700"
                    }`}
                  >
                    {months} {monthsText}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">{featuresText}:</h3>
              <ul className="space-y-2">
                {getBenefitsList()?.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-500 text-sm">
                  {selectedPlan} {monthsText} plan
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {getCurrencySymbol()}
                  {getPriceForSelectedPlan()?.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handlePurchase}
                className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-3xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
              >
                {buyNowText}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
