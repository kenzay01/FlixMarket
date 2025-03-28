"use client";
import { useState, useEffect } from "react";
import { Subscription } from "../../../types/subscriptions";
import { useClientTranslation } from "../../hooks/useTranslate";
import { useParams } from "next/navigation";
import { useMemo } from "react";
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    title: "Basic Plan",
    title_de: "Basis-Plan",
    title_ua: "Базовий план",
    description: "Perfect for individual content creators just starting out.",
    description_de:
      "Perfekt für einzelne Content-Ersteller, die gerade anfangen.",
    description_ua: "Ідеально підходить для початківців",
    benefitsList: [
      "Access to basic creation tools",
      "Up to 10GB storage",
      "Email support",
      "Basic analytics",
    ],
    benefitsList_de: [
      "Zugang zu grundlegenden Erstellungswerkzeugen",
      "Bis zu 10 GB Speicher",
      "E-Mail-Support",
      "Grundlegende Analysen",
    ],
    benefitsList_ua: [
      "Доступ до базових інструментів створення",
      "До 10 ГБ сховища",
      "Підтримка по електронній пошті",
      "Основна аналітика",
    ],
    price_per_month: 9.99,
    price_per_month_eu: 8.99,
    price_per_month_ua: 250,
    price_per_3months: 29.99,
    price_per_3months_eu: 27.99,
    price_per_3months_ua: 750,
    price_per_6months: 49.99,
    price_per_6months_eu: 46.99,
    price_per_6months_ua: 1499,
    price_per_12months: 89.99,
    price_per_12months_eu: 84.99,
    price_per_12months_ua: 2999,
    imageUrl: "/images/basic-plan.jpg",
    regions: ["en", "de", "ua"],
  },
  {
    id: "2",
    title: "Professional Plan",
    title_de: "Profi-Plan",
    title_ua: "Професійний план",
    description: "Ideal for growing creators and small teams.",
    description_de: "Ideal für wachsende Ersteller und kleine Teams.",
    description_ua:
      "Ідеально підходить для зростаючих творців та невеликих команд.",
    benefitsList: [
      "Advanced creation tools",
      "Up to 50GB storage",
      "Priority support",
      "Detailed analytics dashboard",
      "Customization options",
    ],
    benefitsList_de: [
      "Erweiterte Erstellungswerkzeuge",
      "Bis zu 50 GB Speicher",
      "Prioritäts-Support",
      "Detailliertes Analytics-Dashboard",
      "Anpassungsoptionen",
    ],
    benefitsList_ua: [
      "Розширені інструменти створення",
      "До 50 ГБ сховища",
      "Пріоритетна підтримка",
      "Детальна інформація на панелі аналітики",
      "Опції налаштування",
    ],
    price_per_month: 29.99,
    price_per_month_eu: 26.99,
    price_per_month_ua: 750,
    price_per_3months: 0,
    price_per_3months_eu: 0,
    price_per_3months_ua: 0,
    price_per_6months: 99.99,
    price_per_6months_eu: 94.99,
    price_per_6months_ua: 2499,
    price_per_12months: null,
    price_per_12months_eu: null,
    price_per_12months_ua: null,
    imageUrl: "/images/pro-plan.jpg",
    regions: ["en", "ua"],
  },
  {
    id: "3",
    title: "Enterprise Plan",
    title_de: "Unternehmensplan",
    title_ua: "Корпоративний план",
    description:
      "Complete solution for established businesses and large teams.",
    description_de:
      "Komplettlösung für etablierte Unternehmen und große Teams.",
    description_ua:
      "Повне рішення для встановлених підприємств та великих команд.",
    benefitsList: [
      "Full suite of premium tools",
      "Unlimited storage",
      "24/7 dedicated support",
      "Advanced analytics with export",
      "White-labeling options",
      "Team collaboration features",
    ],
    benefitsList_de: [
      "Komplettes Set an Premium-Werkzeugen",
      "Unbegrenzter Speicher",
      "24/7 dedizierter Support",
      "Erweiterte Analysen mit Export",
      "White-Labeling-Optionen",
      "Team-Kollaborationsfunktionen",
    ],
    benefitsList_ua: [
      "Повний набір преміум-інструментів",
      "Необмежене сховище",
      "Цілодобова спеціалізована підтримка",
      "Розширена аналітика з експортом",
      "Опції білого маркування",
      "Функції співпраці команди",
    ],
    price_per_month: 59.99,
    price_per_month_eu: 54.99,
    price_per_month_ua: 1500,
    price_per_3months: 99.99,
    price_per_3months_eu: 94.99,
    price_per_3months_ua: 2500,
    price_per_6months: 179.99,
    price_per_6months_eu: 169.99,
    price_per_6months_ua: 4499,
    price_per_12months: 0,
    price_per_12months_eu: 0,
    price_per_12months_ua: 0,
    imageUrl: "/images/enterprise-plan.jpg",
    regions: ["ua"],
  },
];

const backGroundColors = [
  "bg-gradient-to-r from-indigo-500 to-indigo-500",
  "bg-gradient-to-r from-green-500 to-indigo-500",
  "bg-gradient-to-r from-yellow-500 to-red-500",
];

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";

  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter((subscription) =>
      subscription.regions?.includes(locale)
    );
  }, [locale]);

  useEffect(() => {
    if (currentSlide >= filteredSubscriptions.length) {
      setCurrentSlide(0);
    }
  }, [filteredSubscriptions, currentSlide]);

  useEffect(() => {
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
  const titleMonth = useClientTranslation("months").toLowerCase();
  const btnTitle = useClientTranslation("try_now");

  if (filteredSubscriptions.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center text-center">
        <p className="text-2xl text-gray-600">
          No subscription plans available for this region.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full h-screen max-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {filteredSubscriptions.map((subscription, index) => (
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
            <div className="flex flex-col justify-center h-full max-w-3xl mx-auto px-4 md:px-8 relative z-10">
              <div className="md:w-1/2 w-full text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {locale === "en"
                    ? subscription.title
                    : locale === "ua"
                    ? subscription.title_ua
                    : subscription.title_de}
                </h1>
                <p className="text-lg mb-8 opacity-90">
                  {locale === "en"
                    ? subscription.description
                    : locale === "ua"
                    ? subscription.description_ua
                    : subscription.description_de}
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-bold">
                    {locale === "en"
                      ? "$" + subscription.price_per_3months
                      : locale === "ua"
                      ? "₴" + subscription.price_per_3months_ua
                      : "€" + subscription.price_per_3months_eu}{" "}
                  </span>
                  <span className="ml-2 opacity-80">/3 {titleMonth}</span>
                </div>
                <button className="bg-white text-indigo-900 py-3 px-8 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
                  {btnTitle}
                </button>
              </div>
            </div>
          </div>
        ))}
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
