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
};
export default function HowItWorks() {
  const params = useParams();
  const locale = (params.local as "en" | "ua" | "de") || "en";
  const stepTitle = useClientTranslation("step");
  const btnTitle = useClientTranslation("try_now");
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
          <div className="w-full h-32 bg-amber-950"></div>
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
                  <div className="w-16 h-16  bg-indigo-300 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
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
          <button className="mt-4 px-6 py-2 bg-indigo-600 border-2 border-indigo-600 text-white text-lg rounded-3xl hover:bg-transparent transition hover:text-indigo-600 cursor-pointer">
            {btnTitle}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
