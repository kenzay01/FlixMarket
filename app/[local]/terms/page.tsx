"use client";

import { useParams } from "next/navigation";

export default function TermsPage() {
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";

  const translations = {
    en: {
      pageTitle: "Terms and Conditions",
      termsTitle: "Terms and Conditions",
      serviceProvided:
        "The service is provided to the buyer within 24 hours after payment.",
      goodsSent: "Goods are sent to WhatsApp/Telegram messengers or by email.",
      payment:
        "Payment is possible on the website by card/Apple Pay or Google Pay.",
      refundTitle: "Refund policy",
      refundPolicy:
        "Refunds are only possible if the service cannot be connected. For other reasons, the return of a digital product is not possible.",
      contactTitle: "Contact information",
      storeName: 'Online store "Easy Play"',
      tin: "TIN: 3736606793",
      address: "Kherson, Forshtadska Street 26",
      phone: "Phone number: 0954638612",
      email: "Email: easyplaysup@fsubs.info",
    },
    ua: {
      pageTitle: "Правила і умови",
      termsTitle: "Правила і умови",
      serviceProvided:
        "Послуга надається покупцеві протягом 24 годин після оплати.",
      goodsSent:
        "Товари відправляються у меседжери WhatsApp/Telegram або на електронну пошту.",
      payment: "Оплата можлива на сайті карткою/Apple Pay або Google Pay.",
      refundTitle: "Політика повернення коштів",
      refundPolicy:
        "Повернення коштів можливе тільки за умови неможливості підключення послуги. По іншим причинам повернення цифрового товару неможливе.",
      contactTitle: "Контактна інформація",
      storeName: 'Інтернет-магазин "Easy Play"',
      tin: "ІПН: 3736606793",
      address: "м. Херсон, вул Форштадська 26",
      phone: "Номер телефону: 0954638612",
      email: "Електронна пошта: easyplaysup@fsubs.info",
    },
    de: {
      pageTitle: "Allgemeine Geschäftsbedingungen",
      termsTitle: "Allgemeine Geschäftsbedingungen",
      serviceProvided:
        "Der Service wird dem Käufer innerhalb von 24 Stunden nach der Zahlung zur Verfügung gestellt.",
      goodsSent:
        "Waren werden über WhatsApp/Telegram-Messenger oder per E-Mail verschickt.",
      payment:
        "Die Zahlung ist auf der Website per Karte/Apple Pay oder Google Pay möglich.",
      refundTitle: "Rückerstattungsrichtlinie",
      refundPolicy:
        "Rückerstattungen sind nur möglich, wenn der Service nicht verbunden werden kann. Aus anderen Gründen ist die Rückgabe eines digitalen Produkts nicht möglich.",
      contactTitle: "Kontaktinformationen",
      storeName: 'Online-Shop "Easy Play"',
      tin: "USt-IdNr.: 3736606793",
      address: "Kherson, Forshtadska Straße 26",
      phone: "Telefonnummer: 0954638612",
      email: "E-Mail: easyplaysup@fsubs.info",
    },
  };

  // Вибираємо переклад відповідно до локалі
  const t = translations[locale] || translations.en;

  return (
    <section className="max-w-4xl mx-auto p-6 pt-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t.pageTitle}</h1>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t.termsTitle}</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{t.serviceProvided}</li>
            <li>{t.payment}</li>
            <li>{t.goodsSent}</li>
          </ul>

          <h1 className="text-2xl font-semibold mb-3">{t.refundTitle}</h1>
          <p className="mb-6">{t.refundPolicy}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">{t.contactTitle}</h2>
          <div className="space-y-2">
            <h3 className="text-lg">{t.storeName}</h3>
            <h3 className="text-lg">{t.tin}</h3>
            <h3 className="text-lg">{t.address}</h3>
            <h3 className="text-lg">{t.phone}</h3>
            <h3 className="text-lg">{t.email}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
