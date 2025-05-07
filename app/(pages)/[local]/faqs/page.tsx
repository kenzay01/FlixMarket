"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/app/hooks/useTranslate";

type FAQ = {
  question: string;
  answer: string;
};

const faqData: Record<string, FAQ[]> = {
  en: [
    {
      question: "Who are we?",
      answer:
        "EasyPlay is a platform that allows you to save on the cost of subscriptions to popular services like Netflix, Spotify, Disney+, VPNs, and many more. With our platform, you can effortlessly save up to 70% on their prices.",
    },
    {
      question: "How to purchase a subscription?",
      answer:
        "To activate a subscription, follow these steps:\n1. Register or log in to the website.\n2. Choose the subscription you need and the desired duration.\n3. Make the payment.\n4. After payment, a manager will contact you and activate your subscription (no later than 24 hours after payment).",
    },
    {
      question: "What if my subscription isn't working?",
      answer:
        "After payment, you will have access to a chat with a manager who will help resolve any issues related to your subscription.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "You can pay by card directly on our website (Apple Pay/Google Pay).",
    },
    {
      question: "Can I use the subscription on multiple devices?",
      answer:
        "The number of supported devices is specified in the description of each product.",
    },
    {
      question: "Is there a warranty on the subscription?",
      answer: "Yes, the warranty is valid for the entire subscription period.",
    },
  ],
  de: [
    {
      question: "Wer sind wir?",
      answer:
        "EasyPlay ist eine Plattform, mit der Sie bei den Kosten für Abonnements beliebter Dienste wie Netflix, Spotify, Disney+, VPNs und viele andere sparen können. Mit unserer Plattform können Sie bis zu 70 % der Kosten einsparen – ganz ohne Aufwand.",
    },
    {
      question: "Wie kaufe ich ein Abonnement?",
      answer:
        "Um ein Abonnement zu aktivieren, folgen Sie diesen Schritten:\n1. Registrieren oder anmelden auf der Website.\n2. Wählen Sie das gewünschte Abonnement und die Laufzeit aus.\n3. Zahlen Sie für das Abonnement.\n4. Nach der Zahlung wird sich ein Manager mit Ihnen in Verbindung setzen und Ihr Abonnement aktivieren (spätestens innerhalb von 24 Stunden).",
    },
    {
      question: "Was tun, wenn das Abonnement nicht funktioniert?",
      answer:
        "Nach der Zahlung haben Sie Zugang zu einem Chat mit einem Manager, der Ihnen bei allen Fragen rund um Ihr Abonnement hilft.",
    },
    {
      question: "Welche Zahlungsmethoden sind verfügbar?",
      answer:
        "Sie können mit einer Karte direkt auf unserer Website bezahlen (Apple Pay/Google Pay).",
    },
    {
      question: "Kann ich das Abonnement auf mehreren Geräten nutzen?",
      answer:
        "Die Anzahl der unterstützten Geräte ist in der Beschreibung jedes Produkts angegeben.",
    },
    {
      question: "Gibt es eine Garantie für das Abonnement?",
      answer: "Ja, die Garantie gilt für die gesamte Laufzeit des Abonnements.",
    },
  ],
  ua: [
    {
      question: "Хто ми?",
      answer:
        "EasyPlay - це платформа, за допомогою якої Ви зможете економити на вартості підписок на такі популярні сервіси, як Netflix, Spotify, Disney+, VPN та багато інших. Наша платформа допоможе Вам без жодних зусиль заощадити до 70% від їхньої вартості.",
    },
    {
      question: "Як придбати підписку?",
      answer:
        "Для того, щоб підключитися до підписки, Вам потрібно:\n1. Зареєструватися або авторизуватись на сайті\n2. Вибрати потрібну вам підписку та бажаний термін\n3. Здійснити оплату\n4. Після оплати вам напише менеджер та підключить вам оплачену підписку (Не пізніше ніж через 24 години)",
    },
    {
      question: "Що робити, якщо підписка на сервіс не працює?",
      answer:
        "Після оплати у вас буде чат з менеджером, який допоможе вирішити будь яке питання стосовно підписок.",
    },
    {
      question: "Які способи оплати доступні?",
      answer:
        "Ви можете оплатити карткою прямо на нашому сайті (Apple Pay/Google Pay).",
    },
    {
      question: "Чи можна використовувати підписку на кількох пристроях?",
      answer:
        "Інформація про кількість пристроїв вказана в описі кожного товару",
    },
    {
      question: "Чи є гарантія на підписку?",
      answer: "Так, гарантія діє протягом усього терміну підписки.",
    },
  ],
  cz: [
    {
      question: "Kdo jsme?",
      answer:
        "EasyPlay je platforma, která vám umožňuje ušetřit na nákladech na předplatné populárních služeb, jako jsou Netflix, Spotify, Disney+, VPN a mnoho dalších. S naší platformou můžete bez námahy ušetřit až 70 % jejich ceny.",
    },
    {
      question: "Jak zakoupit předplatné?",
      answer:
        "Chcete-li aktivovat předplatné, postupujte podle těchto kroků:\n1. Zaregistrujte se nebo se přihlaste na webu.\n2. Vyberte si požadované předplatné a jeho délku.\n3. Proveďte platbu.\n4. Po zaplacení vás bude kontaktovat manažer a aktivuje vaše předplatné (nejpozději do 24 hodin po zaplacení).",
    },
    {
      question: "Co dělat, když předplatné nefunguje?",
      answer:
        "Po zaplacení budete mít přístup k chatu s manažerem, který vám pomůže vyřešit jakékoli problémy související s vaším předplatným.",
    },
    {
      question: "Jaké platební metody jsou k dispozici?",
      answer:
        "Platit můžete kartou přímo na našem webu (Apple Pay/Google Pay).",
    },
    {
      question: "Mohu předplatné používat na více zařízeních?",
      answer:
        "Počet podporovaných zařízení je uveden v popisu každého produktu.",
    },
    {
      question: "Je na předplatné záruka?",
      answer: "Ano, záruka platí po celou dobu trvání předplatného.",
    },
  ],
};

export default function Faqs() {
  const params = useParams();
  const locale = (params?.local as string) || "en";
  const title = useClientTranslation("faq");

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const faqIsOpen = (index: number) => {
    return openFaqIndex === index;
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-4xl mb-6">{title}</h1>
      <div className="space-y-4">
        {faqData[locale].map((faq, index) => (
          <div
            key={index}
            className="border-b-2 border-b-gray-300 overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full text-left p-4  hover:bg-gray-200 hover:rounded-tl-2xl hover:rounded-tr-2xl flex justify-between items-center cursor-pointer outline-0 ${
                faqIsOpen(index) ? "text-indigo-500" : "text-gray-800"
              }`}
            >
              <span className="font-semibold text-xl">{faq.question}</span>
              <span className="text-2xl">
                {openFaqIndex === index ? "−" : "+"}
              </span>
            </button>
            {openFaqIndex === index && (
              <div className="p-4 bg-white">
                <p className="whitespace-pre-line text-lg">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
