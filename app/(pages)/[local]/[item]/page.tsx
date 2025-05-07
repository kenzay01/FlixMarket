"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft, FaSpinner } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import type { Subscription } from "../../../../types/subscriptions";
import { useSubscriptions } from "@/context/hooks";
import { getMonthsUa } from "@/app/funcs/getMonthsUa";
import { useSession } from "next-auth/react";
import { useUsers } from "@/context/hooks";

export default function ItemPage() {
  const { subscriptions } = useSubscriptions();
  const { data: session } = useSession();
  const { users } = useUsers();
  const user = users.find((user) => user.id === session?.user.id);
  const params = useParams();
  const router = useRouter();
  const locale = params.local as string;
  const itemId = params.item as string;
  const subscription = subscriptions.find(
    (sub) => sub.id === itemId.replace("item", "")
  );

  const buyNowTextFetch = useClientTranslation("buy_now");
  const buyNowText =
    buyNowTextFetch === "buy_now" ? "Buy Now" : buyNowTextFetch;
  const monthsTextFetch = useClientTranslation("months");
  const monthsText = monthsTextFetch === "months" ? "Months" : monthsTextFetch;
  const selectPlanTextFetch = useClientTranslation("select_plan");
  const selectPlanText =
    selectPlanTextFetch === "select_plan" ? "Select Plan" : selectPlanTextFetch;
  const backTextFetch = useClientTranslation("back");
  const backText = backTextFetch === "back" ? "Back" : backTextFetch;
  const featuresTextFetch = useClientTranslation("features");
  const featuresText =
    featuresTextFetch === "features" ? "Features" : featuresTextFetch;
  const processingTextFetch = useClientTranslation("processing");
  const processingText =
    processingTextFetch === "processing"
      ? "Processing..."
      : processingTextFetch;

  const [selectedPlan, setSelectedPlan] = useState<"1" | "3" | "6" | "12">("1");
  const [isProcessing, setIsProcessing] = useState(false);

  const getLocalizedContent = (field: string, fallback: string) => {
    if (!subscription) return fallback;

    return locale === "de" && subscription[`${field}_de` as keyof Subscription]
      ? subscription[`${field}_de` as keyof Subscription]
      : locale === "ua" && subscription[`${field}_ua` as keyof Subscription]
      ? subscription[`${field}_ua` as keyof Subscription]
      : locale === "cz" && subscription[`${field}_cs` as keyof Subscription]
      ? subscription[`${field}_cs` as keyof Subscription]
      : subscription[field as keyof Subscription];
  };

  const getBenefitsList = () => {
    if (!subscription) return [];
    return locale === "de"
      ? subscription.benefitsList_de
      : locale === "ua"
      ? subscription.benefitsList_ua
      : locale === "cz"
      ? subscription.benefitsList_cs
      : subscription.benefitsList;
  };

  const getMonthPicker = () => {
    if (!subscription) return [];

    const monthTermin = [];
    const isEuro = locale === "de";
    const isCz = locale === "cz";
    const isUa = locale === "ua";

    const priceForMonth = isEuro
      ? subscription.price_per_month_eu
      : isCz
      ? subscription.price_per_month_cz
      : isUa
      ? subscription.price_per_month_ua
      : subscription.price_per_month;

    const priceFor3Months = isEuro
      ? subscription.price_per_3months_eu
      : isCz
      ? subscription.price_per_3months_cz
      : isUa
      ? subscription.price_per_3months_ua
      : subscription.price_per_3months;

    const priceFor6Months = isEuro
      ? subscription.price_per_6months_eu
      : isCz
      ? subscription.price_per_6months_cz
      : isUa
      ? subscription.price_per_6months_ua
      : subscription.price_per_6months;

    const priceFor12Months = isEuro
      ? subscription.price_per_12months_eu
      : isCz
      ? subscription.price_per_12months_cz
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

  const handlePurchase = async () => {
    if (!subscription) return;

    try {
      setIsProcessing(true);

      console.log("Selected plan:", selectedPlan);
      console.log("Subscription ID:", subscription.id);
      console.log("User ID:", user?.id);
      // Створюємо запит до нашого API для ініціалізації платежу
      const response = await fetch("/api/payment/monobank/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          selectedPlan,
          locale,
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      // Перенаправляємо користувача на сторінку оплати Monobank
      window.location.href = data.pageUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        locale === "ua"
          ? "Помилка при створенні платежу. Спробуйте пізніше."
          : locale === "de"
          ? "Fehler bei der Zahlungserstellung. Bitte versuchen Sie es später erneut."
          : locale === "cz"
          ? "Chyba při vytváření platby. Zkuste to prosím znovu později."
          : "Error creating payment. Please try again later."
      );

      setIsProcessing(false);
    }
  };

  const getPriceForSelectedPlan = () => {
    if (!subscription) return 0;

    const isEuro = locale === "de";
    const isCz = locale === "cz";
    const isUa = locale === "ua";

    switch (selectedPlan) {
      case "1":
        return isEuro
          ? subscription.price_per_month_eu
          : isCz
          ? subscription.price_per_month_cz
          : isUa
          ? subscription.price_per_month_ua
          : subscription.price_per_month;
      case "3":
        return isEuro
          ? subscription.price_per_3months_eu
          : isCz
          ? subscription.price_per_3months_cz
          : isUa
          ? subscription.price_per_3months_ua
          : subscription.price_per_3months;
      case "6":
        return isEuro
          ? subscription.price_per_6months_eu
          : isCz
          ? subscription.price_per_6months_cz
          : isUa
          ? subscription.price_per_6months_ua
          : subscription.price_per_6months;
      case "12":
        return isEuro
          ? subscription.price_per_12months_eu
          : isCz
          ? subscription.price_per_12months_cz
          : isUa
          ? subscription.price_per_12months_ua
          : subscription.price_per_12months;
      default:
        return isEuro
          ? subscription.price_per_3months_eu
          : isCz
          ? subscription.price_per_3months_cz
          : isUa
          ? subscription.price_per_3months_ua
          : subscription.price_per_3months;
    }
  };

  const getCurrencySymbol = () => {
    return locale === "de"
      ? "€"
      : locale === "ua"
      ? "₴"
      : locale === "cz"
      ? "Kč "
      : "$";
  };

  const getMonthsCz = (months: string) => {
    switch (months) {
      case "1":
        return "měsíc";
      case "3":
        return "měsíce";
      case "6":
        return "měsíců";
      case "12":
        return "měsíců";
      default:
        return "měsíců";
    }
  };

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
            className="w-full lg:w-1/2 p-6 flex items-start justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {subscription.imageUrl ? (
              <img
                src={subscription.imageUrl}
                alt="Subscription Image"
                className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-xl object-cover"
                loading="lazy"
              />
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
            <p className="text-gray-700 mb-6 text-lg whitespace-pre-line">
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
                    disabled={isProcessing}
                  >
                    {locale === "ua"
                      ? `${months} ${getMonthsUa(months)}`
                      : locale === "cz"
                      ? `${months} ${getMonthsCz(months)}`
                      : `${months} ${monthsText}`}
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

            <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between mb-8">
              <div>
                <p className="text-gray-500 text-sm">
                  {locale === "ua"
                    ? `${selectedPlan} ${getMonthsUa(selectedPlan)}`
                    : locale === "cz"
                    ? `${selectedPlan} ${getMonthsCz(selectedPlan)}`
                    : `${selectedPlan} ${monthsText}`}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {getCurrencySymbol()}
                  {getPriceForSelectedPlan()?.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className={`px-8 py-3 bg-indigo-600 text-white text-lg rounded-3xl transition shadow-md flex items-center justify-center gap-2 ${
                  isProcessing
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin" /> {processingText}
                  </>
                ) : (
                  buyNowText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
