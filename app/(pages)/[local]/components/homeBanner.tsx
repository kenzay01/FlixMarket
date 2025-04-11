"use client";
import { useState, useEffect, useMemo } from "react";
import { useClientTranslation } from "../../../hooks/useTranslate";
import { useParams, useRouter } from "next/navigation";
import { useSubscriptions } from "@/context/hooks";
import { getMonthsUa } from "../../../funcs/getMonthsUa";
const backGroundColors = [
  "bg-gradient-to-r from-indigo-600 to-indigo-500",
  "bg-gradient-to-r from-green-500 to-indigo-500",
  "bg-gradient-to-r from-yellow-500 to-red-500",
  "bg-gradient-to-r from-purple-600 to-blue-500",
  "bg-gradient-to-r from-pink-500 to-orange-400",
];

// Визначаємо логотипи для різних сервісів
const serviceLogos = {
  netflix:
    "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png",
  "sweet.tv":
    "https://assol.in.ua/image/cache/catalog/assol/17934/servisy-assol-serv-s-p-dpiska-sweet-tv-1-445x445.jpg",
  "sweet tv":
    "https://assol.in.ua/image/cache/catalog/assol/17934/servisy-assol-serv-s-p-dpiska-sweet-tv-1-445x445.jpg",
  disney:
    "https://seeklogo.com/images/D/Disney-logo-847839C4FF-seeklogo.com.png",
  spotify: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
  youtube: "https://cdn-icons-png.flaticon.com/512/174/174883.png",
  vpn: "https://cdn-icons-png.flaticon.com/256/8017/8017361.png",
};

export default function HomeBanner() {
  const router = useRouter();
  const { subscriptions, fetchSubscriptions } = useSubscriptions();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";
  const noSubscriptions = useClientTranslation("no_subscriptions");
  const loadingText = useClientTranslation("loading") || "Loading...";

  const getBestPriceOption = (subscription) => {
    const prices = {
      "3":
        locale === "en"
          ? subscription.price_per_3months
          : locale === "ua"
          ? subscription.price_per_3months_ua
          : subscription.price_per_3months_eu,
      "1":
        locale === "en"
          ? subscription.price_per_month
          : locale === "ua"
          ? subscription.price_per_month_ua
          : subscription.price_per_month_eu,
      "6":
        locale === "en"
          ? subscription.price_per_6months
          : locale === "ua"
          ? subscription.price_per_6months_ua
          : subscription.price_per_6months_eu,
      "12":
        locale === "en"
          ? subscription.price_per_12months
          : locale === "ua"
          ? subscription.price_per_12months_ua
          : subscription.price_per_12months_eu,
    };

    const priorityOrder = ["1", "3", "6", "12"];

    for (const duration of priorityOrder) {
      if (prices[duration] > 0) {
        return {
          price: prices[duration],
          duration,
        };
      }
    }

    return {
      price: prices["3"] || 0,
      duration: "3",
    };
  };

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setIsLoading(true);
        await fetchSubscriptions();
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (subscriptions.length === 0 || isLoading) {
      loadSubscriptions();
    }
    setIsLoading(false);
  }, [fetchSubscriptions, subscriptions.length]);

  const filteredSubscriptions = useMemo(() => {
    if (isLoading) return [];
    if (!subscriptions) return [];

    // Спочатку фільтруємо за локаллю
    const filtered = subscriptions.filter((subscription) =>
      subscription.regions?.includes(locale)
    );
    return filtered.slice(0, 5);
  }, [subscriptions, locale]);

  useEffect(() => {
    if (
      currentSlide >= filteredSubscriptions.length &&
      filteredSubscriptions.length > 0
    ) {
      setCurrentSlide(0);
    }
  }, [filteredSubscriptions, currentSlide]);

  useEffect(() => {
    if (filteredSubscriptions.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === filteredSubscriptions.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [filteredSubscriptions]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === filteredSubscriptions.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? filteredSubscriptions.length - 1 : prev - 1
    );
  };

  // Функція для визначення логотипу для підписки на основі її назви
  const getServiceLogo = (title) => {
    if (!title) return null;

    // Перетворюємо заголовок на нижній регістр для пошуку
    const lowerTitle = title.toLowerCase();

    // Перевіряємо, чи містить заголовок ключові слова сервісів
    for (const service of Object.keys(serviceLogos)) {
      if (lowerTitle.includes(service)) {
        return serviceLogos[service];
      }
    }

    return null;
  };

  const titleMonth = useClientTranslation("months").toLowerCase();
  const btnTitle = useClientTranslation("try_now");

  if (isLoading) {
    return (
      <section className="w-full h-screen flex items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-indigo-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-2xl text-white">{loadingText}</p>
        </div>
      </section>
    );
  }

  if (filteredSubscriptions.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-indigo-500">
        <p className="text-2xl text-white">{noSubscriptions}</p>
      </section>
    );
  }

  return (
    <section className="w-full h-screen max-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {filteredSubscriptions.map((subscription, index) => {
          const title =
            locale === "en"
              ? subscription.title
              : locale === "ua"
              ? subscription.title_ua
              : subscription.title_de;

          const logoUrl = getServiceLogo(title);

          return (
            <div
              key={subscription.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-full ${
                  backGroundColors[index % backGroundColors.length]
                }`}
              ></div>
              <div className="flex flex-col justify-center h-full max-w-5xl mx-auto px-13 md:px-8 relative z-10">
                <div className="w-full text-white">
                  <div className="flex items-center gap-3 mb-4 relative">
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="Service logo"
                        className="w-8 h-8 object-contain absolute top-1 -left-10"
                      />
                    )}
                    <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
                  </div>
                  <p className="text-xs md:text-sm mb-8 opacity-90 whitespace-pre-line">
                    {locale === "en"
                      ? subscription.description
                      : locale === "ua"
                      ? subscription.description_ua
                      : subscription.description_de}
                  </p>
                  <div className="mb-8">
                    {(() => {
                      const { price, duration } =
                        getBestPriceOption(subscription);
                      const currencySymbol =
                        locale === "en" ? "$" : locale === "ua" ? "₴" : "€";

                      return (
                        <span className="text-xl md:text-3xl font-bold">
                          {currencySymbol}
                          {price}
                          <span className="ml-2 opacity-80">
                            /
                            {locale === "ua"
                              ? `${duration} ${getMonthsUa(duration)}`
                              : `${duration} ${titleMonth}`}
                          </span>
                        </span>
                      );
                    })()}
                  </div>
                  <button
                    onClick={() => {
                      router.push(`/${locale}/item${subscription.id}`);
                    }}
                    className="bg-white text-indigo-900 py-3 px-8 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300 cursor-pointer"
                  >
                    {btnTitle}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubscriptions.length > 1 && (
        <>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-20">
            {filteredSubscriptions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-10"
                    : "bg-white bg-opacity-50"
                } cursor-pointer`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 w-10 h-10 rounded-full items-center justify-center text-white z-20 hover:bg-opacity-50 transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hidden absolute right-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 w-10 h-10 rounded-full lg:flex items-center justify-center text-white z-20 hover:bg-opacity-50 transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
