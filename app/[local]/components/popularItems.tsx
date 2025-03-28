import PopularItem from "./popularItem";
import type { Subscription } from "../../../types/subscriptions";
import { useClientTranslation } from "@/app/hooks/useTranslate";
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
export default function PopularItems() {
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";
  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter((subscription) =>
      subscription.regions?.includes(locale)
    );
  }, [locale]);
  const title = useClientTranslation("popular_items");
  return (
    <section className="w-full max-w-5xl mx-auto p-6 pt-24 overflow-x-hidden">
      <h2 className="w-full text-center text-4xl font-bold mb-8">{title}</h2>
      <div>
        {filteredSubscriptions.map((item, index) => (
          <PopularItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
