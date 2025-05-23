import { useClientTranslation } from "@/app/hooks/useTranslate";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const steps = {
  en: [
    "Authorize or register on our website",
    "Choose the desired subscription and term",
    "Pay for your order",
    "A manager will contact you and connect your subscription",
    "Enjoy quality services during the paid period",
  ],
  ua: [
    "Авторизуйтесь або зареєструйтесь на нашому сайті",
    "Виберіть потрібну підписку та бажаний термін",
    "Оплатіть ваше замовлення",
    "З вами звʼяжеться менеджер та підключить вашу підписку",
    "Насолоджуєтесь якісними послугами оплачений період",
  ],
  de: [
    "Melden Sie sich auf unserer Website an oder registrieren Sie sich",
    "Wählen Sie das gewünschte Abonnement und den gewünschten Zeitraum",
    "Bezahlen Sie Ihre Bestellung",
    "Ein Mitarbeiter wird Sie kontaktieren und Ihr Abonnement aktivieren",
    "Genießen Sie Qualitätsdienstleistungen während des bezahlten Zeitraums",
  ],
  cz: [
    "Přihlaste se nebo se registrujte na našem webu",
    "Vyberte si požadované předplatné a jeho délku",
    "Zaplaťte za svou objednávku",
    "Manažer vás bude kontaktovat a aktivuje vaše předplatné",
    "Užijte si kvalitní služby po dobu zaplaceného období",
  ],
  pl: [
    "Zaloguj się lub zarejestruj na naszej stronie",
    "Wybierz żądaną subskrypcję i okres",
    "Opłać swoje zamówienie",
    "Menedżer skontaktuje się z Tobą i aktywuje Twoją subskrypcję",
    "Ciesz się wysokiej jakości usługami przez opłacony okres",
  ],
};

export default function HowItWorks() {
  const params = useParams();
  const locale = (params.local as "en" | "ua" | "de" | "cz" | "pl") || "en";
  const stepTitle = useClientTranslation("step");
  const mainTitle = useClientTranslation("how_it_works");
  const currentSteps = steps?.[locale] ?? [];

  return (
    <section
      className="w-full mx-auto flex items-center justify-center overflow-x-hidden pt-24"
      id="how-it-works"
    >
      <div className="max-w-5xl flex flex-col md:flex-row w-full p-6 gap-6">
        <motion.div
          className="flex-6"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="w-full">
            <img
              src="/howItWorks.png"
              alt="Jak to funguje"
              className="w-full aspect-[13/9] object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          className="p-6 flex-5"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="text-4xl">{mainTitle}</h1>
          <div>
            {currentSteps.map((step, index) => {
              return (
                <div key={index} className="flex gap-4 items-start my-8">
                  <div className="w-16 h-16 bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                    {index + 1}
                  </div>
                  <div className="p-2 flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {stepTitle} {index + 1}
                    </h2>
                    <p className="text-gray-600">{step}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
