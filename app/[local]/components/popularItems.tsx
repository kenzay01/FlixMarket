import PopularItem from "./popularItem";
import type { Subscription } from "../../../types/subscriptions";
import { useClientTranslation } from "@/app/hooks/useTranslate";
export default function PopularItems() {
  const mockSubscriptions: Subscription[] = [
    {
      id: "1",
      title: "Basic Plan",
      title_de: "Basis-Plan",
      description: "Perfect for individual content creators just starting out.",
      description_de:
        "Perfekt für einzelne Content-Ersteller, die gerade anfangen.",
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
      price_per_month: 9.99,
      price_per_month_eu: 8.99,
      price_per_3months: 29.99,
      price_per_3months_eu: 27.99,
      price_per_6months: 49.99,
      price_per_6months_eu: 46.99,
      price_per_12months: 89.99,
      price_per_12months_eu: 84.99,
      imageUrl: "/images/basic-plan.jpg",
    },
    {
      id: "2",
      title: "Professional Plan",
      title_de: "Profi-Plan",
      description: "Ideal for growing creators and small teams.",
      description_de: "Ideal für wachsende Ersteller und kleine Teams.",
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
      price_per_month: 59.99,
      price_per_month_eu: 56.99,
      price_per_3months: 59.99,
      price_per_3months_eu: 56.99,
      price_per_6months: 99.99,
      price_per_6months_eu: 94.99,
      price_per_12months: 179.99,
      price_per_12months_eu: 169.99,
      imageUrl: "/images/pro-plan.jpg",
    },
    {
      id: "3",
      title: "Enterprise Plan",
      title_de: "Unternehmensplan",
      description:
        "Complete solution for established businesses and large teams.",
      description_de:
        "Komplettlösung für etablierte Unternehmen und große Teams.",
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
      price_per_month: 99.99,
      price_per_month_eu: 94.99,
      price_per_3months: 99.99,
      price_per_3months_eu: 94.99,
      price_per_6months: 179.99,
      price_per_6months_eu: 169.99,
      price_per_12months: 329.99,
      price_per_12months_eu: 309.99,
      imageUrl: "/images/enterprise-plan.jpg",
    },
  ];

  const title = useClientTranslation("popular_items");
  return (
    <section className="w-full max-w-5xl mx-auto p-6 pt-24 overflow-x-hidden">
      <h2 className="w-full text-center text-4xl font-bold mb-8">{title}</h2>
      <div>
        {mockSubscriptions.map((item, index) => (
          <PopularItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
