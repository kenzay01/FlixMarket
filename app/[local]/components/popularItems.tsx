"use client";

import PopularItem from "./popularItem";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { useSubscriptions } from "@/context/hooks";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f6752e1 (done loading images from admin page)
=======
>>>>>>> 94a1d3490881610771c584fa46bfc6e5b3f0e033
import { Subscription as UISubscription } from "@/types/subscriptions";
import { Subscription as EntitySubscription } from "@/entities/Subscription";

function adaptSubscription(subscription: EntitySubscription): UISubscription {
  // Create a new File object from the string
  const imageFile = subscription.imageFile
    ? new File([new Blob()], subscription.imageFile, { type: "image/jpeg" })
    : null;

  return {
    ...subscription,
    imageFile,
  } as UISubscription;
}
export default function PopularItems() {
  const { subscriptions, fetchSubscriptions } = useSubscriptions();

=======
// const mockSubscriptions: Subscription[] = [
//   {
//     id: "1",
//     title: "Basic Plan",
//     title_de: "Basis-Plan",
//     title_ua: "Базовий план",
//     description: "Perfect for individual content creators just starting out.",
//     description_de:
//       "Perfekt für einzelne Content-Ersteller, die gerade anfangen.",
//     description_ua: "Ідеально підходить для початківців",
//     benefitsList: [
//       "Access to basic creation tools",
//       "Up to 10GB storage",
//       "Email support",
//       "Basic analytics",
//     ],
//     benefitsList_de: [
//       "Zugang zu grundlegenden Erstellungswerkzeugen",
//       "Bis zu 10 GB Speicher",
//       "E-Mail-Support",
//       "Grundlegende Analysen",
//     ],
//     benefitsList_ua: [
//       "Доступ до базових інструментів створення",
//       "До 10 ГБ сховища",
//       "Підтримка по електронній пошті",
//       "Основна аналітика",
//     ],
//     price_per_month: 9.99,
//     price_per_month_eu: 8.99,
//     price_per_month_ua: 250,
//     price_per_3months: 29.99,
//     price_per_3months_eu: 27.99,
//     price_per_3months_ua: 750,
//     price_per_6months: 49.99,
//     price_per_6months_eu: 46.99,
//     price_per_6months_ua: 1499,
//     price_per_12months: 89.99,
//     price_per_12months_eu: 84.99,
//     price_per_12months_ua: 2999,
//     imageUrl: "/images/basic-plan.jpg",
//     regions: ["en", "de", "ua"],
//   },
//   {
//     id: "2",
//     title: "Professional Plan",
//     title_de: "Profi-Plan",
//     title_ua: "Професійний план",
//     description: "Ideal for growing creators and small teams.",
//     description_de: "Ideal für wachsende Ersteller und kleine Teams.",
//     description_ua:
//       "Ідеально підходить для зростаючих творців та невеликих команд.",
//     benefitsList: [
//       "Advanced creation tools",
//       "Up to 50GB storage",
//       "Priority support",
//       "Detailed analytics dashboard",
//       "Customization options",
//     ],
//     benefitsList_de: [
//       "Erweiterte Erstellungswerkzeuge",
//       "Bis zu 50 GB Speicher",
//       "Prioritäts-Support",
//       "Detailliertes Analytics-Dashboard",
//       "Anpassungsoptionen",
//     ],
//     benefitsList_ua: [
//       "Розширені інструменти створення",
//       "До 50 ГБ сховища",
//       "Пріоритетна підтримка",
//       "Детальна інформація на панелі аналітики",
//       "Опції налаштування",
//     ],
//     price_per_month: 29.99,
//     price_per_month_eu: 26.99,
//     price_per_month_ua: 750,
//     price_per_3months: 0,
//     price_per_3months_eu: 0,
//     price_per_3months_ua: 0,
//     price_per_6months: 99.99,
//     price_per_6months_eu: 94.99,
//     price_per_6months_ua: 2499,
//     price_per_12months: null,
//     price_per_12months_eu: null,
//     price_per_12months_ua: null,
//     imageUrl: "/images/pro-plan.jpg",
//     regions: ["en", "ua"],
//   },
//   {
//     id: "3",
//     title: "Enterprise Plan",
//     title_de: "Unternehmensplan",
//     title_ua: "Корпоративний план",
//     description:
//       "Complete solution for established businesses and large teams.",
//     description_de:
//       "Komplettlösung für etablierte Unternehmen und große Teams.",
//     description_ua:
//       "Повне рішення для встановлених підприємств та великих команд.",
//     benefitsList: [
//       "Full suite of premium tools",
//       "Unlimited storage",
//       "24/7 dedicated support",
//       "Advanced analytics with export",
//       "White-labeling options",
//       "Team collaboration features",
//     ],
//     benefitsList_de: [
//       "Komplettes Set an Premium-Werkzeugen",
//       "Unbegrenzter Speicher",
//       "24/7 dedizierter Support",
//       "Erweiterte Analysen mit Export",
//       "White-Labeling-Optionen",
//       "Team-Kollaborationsfunktionen",
//     ],
//     benefitsList_ua: [
//       "Повний набір преміум-інструментів",
//       "Необмежене сховище",
//       "Цілодобова спеціалізована підтримка",
//       "Розширена аналітика з експортом",
//       "Опції білого маркування",
//       "Функції співпраці команди",
//     ],
//     price_per_month: 59.99,
//     price_per_month_eu: 54.99,
//     price_per_month_ua: 1500,
//     price_per_3months: 99.99,
//     price_per_3months_eu: 94.99,
//     price_per_3months_ua: 2500,
//     price_per_6months: 179.99,
//     price_per_6months_eu: 169.99,
//     price_per_6months_ua: 4499,
//     price_per_12months: 0,
//     price_per_12months_eu: 0,
//     price_per_12months_ua: 0,
//     imageUrl: "/images/enterprise-plan.jpg",
//     regions: ["ua"],
//   },
// ];
export default function PopularItems() {
  const { subscriptions, fetchSubscriptions } = useSubscriptions();
  console.log("Subscriptions:", subscriptions);
>>>>>>> 75318fb (done admin subscrioption)
=======
export default function PopularItems() {
  const { subscriptions, fetchSubscriptions } = useSubscriptions();

>>>>>>> a3f7b19 (clear code)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        await fetchSubscriptions();
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (subscriptions.length === 0) {
      loadSubscriptions();
    } else {
      setIsLoading(false);
    }
  }, [fetchSubscriptions, subscriptions.length]);
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";
  const noSubscriptions = useClientTranslation("no_subscriptions");
  const title = useClientTranslation("popular_items");
  const loadingText = useClientTranslation("loading") || "Loading...";
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) =>
      subscription.regions?.includes(locale)
    );
  }, [subscriptions, locale]);
<<<<<<< HEAD
<<<<<<< HEAD
  let content;
  if (filteredSubscriptions.length === 0 && !isLoading) {
=======
  console.log("Filtered subscriptions:", filteredSubscriptions);
  let content;
  if (filteredSubscriptions.length === 0 && !isLoading) {
    // Показати повідомлення про відсутність підписок тільки якщо завантаження завершено
>>>>>>> 75318fb (done admin subscrioption)
=======
  let content;
  if (filteredSubscriptions.length === 0 && !isLoading) {
>>>>>>> a3f7b19 (clear code)
    content = (
      <section className="w-full my-16 flex items-center justify-center text-center">
        <p className="text-2xl">{noSubscriptions}</p>
      </section>
    );
  } else if (filteredSubscriptions.length > 0) {
<<<<<<< HEAD
<<<<<<< HEAD
    content = (
      <div>
        {filteredSubscriptions.map((item, index) => (
          <PopularItem
            key={index}
            item={adaptSubscription(item)}
            index={index}
          />
<<<<<<< HEAD
=======
    // Показувати підписки тільки якщо вони є
=======
>>>>>>> a3f7b19 (clear code)
    content = (
      <div>
        {filteredSubscriptions.map((item, index) => (
<<<<<<< HEAD
          <PopularItem key={index} item={item} index={index} />
>>>>>>> 75318fb (done admin subscrioption)
=======
          <PopularItem
            key={index}
            item={adaptSubscription(item)}
            index={index}
          />
>>>>>>> f6752e1 (done loading images from admin page)
=======
>>>>>>> 94a1d3490881610771c584fa46bfc6e5b3f0e033
        ))}
      </div>
    );
  }

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
  return (
    <section className="w-full max-w-5xl mx-auto p-6 pt-24 overflow-x-hidden">
      <h2 className="w-full text-center text-4xl font-bold mb-8">{title}</h2>
      {content}
    </section>
  );
}
