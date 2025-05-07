"use client";

import { useClientTranslation } from "@/app/hooks/useTranslate";
import ReviewItem from "./reviewItem";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useParams } from "next/navigation";

export default function ReviewsContainer() {
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua" | "cz") || "en";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Original reviews in Ukrainian
  const originalReviews = [
    {
      id: 1,
      email: "ivanov123@ukr.net",
      rating: 4,
      comment:
        "Один із найкращих сервісів! Порадили знайомі, але це просто топ — підписки на 50-70% дешевші. Рекомендую спробувати)",
    },
    {
      id: 2,
      username: "Марина",
      rating: 5,
      comment:
        "Дуже задоволена підписками. Підтримка чудова, швидко відповідають і допомогли з підключенням однієї з них за кордоном. Безмежно дякую!!!",
    },
    {
      id: 3,
      email: "pavlo.d@gmail.com",
      rating: 5,
      comment:
        "Доброзичливістю і готовністю вирішити всі складнощі в ситуації - я максимально вражений! Такої техпідтримки я ще не зустрічав. Дуже вдячний!",
    },
    {
      id: 4,
      username: "Олексій",
      rating: 5,
      comment:
        "Пробував різні сервіси, вже декілька місяців поспіль користуюсь чатом GPT - незамінна річ. Дякую, що зробили це доступним для мене.",
    },
    {
      id: 5,
      email: "anna.petrenko@mail.com",
      rating: 5,
      comment:
        "Я балдію! Зекономила 300 грн і дивлюся собі той Нетфлікс реально цілими днями) Дякую вам 🤍",
    },
    {
      id: 6,
      username: "Віталій",
      rating: 5,
      comment:
        "Велике спасибі за вашу роботу! Підписки дійсно коштують дешевше, все швидко і зручно. Користуюсь із задоволенням, все працює відмінно.",
    },
    {
      id: 7,
      email: "dmytro.levchuk@ukr.net",
      rating: 5,
      comment:
        "Просто дякую за сервіс! Раніше я використовував подібний метод із друзями, але тут можна дуже непогано заощадити. Щиро дякую і бажаю успіхів!",
    },
    {
      id: 8,
      username: "Тетяна",
      rating: 4,
      comment:
        "Сервіс, котрий заощаджує мені кошти. Зручно та ефективно. Чекаю на розширення сервісів, доступних для підписок.",
    },
    {
      id: 9,
      username: "Юлія",
      rating: 5,
      comment:
        "Найкращі! Підтримка в Телеграмі — то окреме кохання! Задавала 1000 питань, на всі відповіли і допомогли ♥️",
    },
    {
      id: 10,
      username: "Сергій",
      rating: 5,
      comment:
        "Навіть не уявляю, як обходився без вас раніше) Рекомендую всім!",
    },
    {
      id: 11,
      username: "Олена",
      rating: 5,
      comment:
        "Ваш сервіс — це реально справжня знахідка! Доступні підписки, відмінна якість, і головне — значна економія ) Тепер всі мої друзі теж користуються!",
    },
    {
      id: 12,
      username: "Максим",
      rating: 5,
      comment:
        "Я радив вас своїм друзям, які купували напряму Нетфлікс. Говорив, що так дешевше! Тепер всі разом користуємось! Все подобається!",
    },
  ];

  // Translations for English
  const englishReviews = [
    {
      id: 1,
      email: "ivanov123@ukr.net",
      rating: 4,
      comment:
        "One of the best services! Recommended by friends, but it's simply top-notch — subscriptions are 50-70% cheaper. I recommend trying it!",
    },
    {
      id: 2,
      username: "Marina",
      rating: 5,
      comment:
        "Very satisfied with the subscriptions. Support is excellent, they respond quickly and helped me connect one of them abroad. Infinitely grateful!!!",
    },
    {
      id: 3,
      email: "pavlo.d@gmail.com",
      rating: 5,
      comment:
        "I'm extremely impressed by their kindness and readiness to solve all complications! I have never encountered such great technical support. Very grateful!",
    },
    {
      id: 4,
      username: "Oleksii",
      rating: 5,
      comment:
        "I've tried various services, been using GPT chat for several months now - it's indispensable. Thank you for making it accessible to me.",
    },
    {
      id: 5,
      email: "anna.petrenko@mail.com",
      rating: 5,
      comment:
        "I'm thrilled! Saved 300 UAH and I'm watching Netflix literally all day long) Thank you 🤍",
    },
    {
      id: 6,
      username: "Vitalii",
      rating: 5,
      comment:
        "Thank you so much for your work! Subscriptions are indeed cheaper, everything is fast and convenient. I use it with pleasure, everything works excellently.",
    },
    {
      id: 7,
      email: "dmytro.levchuk@ukr.net",
      rating: 5,
      comment:
        "Simply thank you for the service! I used to use a similar method with friends, but here you can save quite well. Thank you sincerely and I wish you success!",
    },
    {
      id: 8,
      username: "Tetiana",
      rating: 4,
      comment:
        "A service that saves me money. Convenient and effective. I'm looking forward to expanding the services available for subscriptions.",
    },
    {
      id: 9,
      username: "Yuliia",
      rating: 5,
      comment:
        "The best! Support in Telegram is a separate love! I asked 1000 questions, they answered all of them and helped ♥️",
    },
    {
      id: 10,
      username: "Serhii",
      rating: 5,
      comment:
        "I can't even imagine how I managed without you before) I recommend to everyone!",
    },
    {
      id: 11,
      username: "Olena",
      rating: 5,
      comment:
        "Your service is really a true find! Affordable subscriptions, excellent quality, and most importantly - significant savings ) Now all my friends also use it!",
    },
    {
      id: 12,
      username: "Maksym",
      rating: 5,
      comment:
        "I recommended you to my friends who were buying Netflix directly. I told them it's cheaper this way! Now we're all using it together! Everything is great!",
    },
  ];

  // Translations for German
  const germanReviews = [
    {
      id: 1,
      email: "ivanov123@ukr.net",
      rating: 4,
      comment:
        "Einer der besten Dienste! Von Freunden empfohlen, aber es ist einfach spitze — Abonnements sind 50-70% günstiger. Ich empfehle es auszuprobieren!",
    },
    {
      id: 2,
      username: "Marina",
      rating: 5,
      comment:
        "Sehr zufrieden mit den Abonnements. Der Support ist ausgezeichnet, sie antworten schnell und haben mir geholfen, eines davon im Ausland zu verbinden. Unendlich dankbar!!!",
    },
    {
      id: 3,
      email: "pavlo.d@gmail.com",
      rating: 5,
      comment:
        "Ich bin äußerst beeindruckt von ihrer Freundlichkeit und Bereitschaft, alle Komplikationen zu lösen! Ich habe noch nie einen so großartigen technischen Support erlebt. Sehr dankbar!",
    },
    {
      id: 4,
      username: "Oleksii",
      rating: 5,
      comment:
        "Ich habe verschiedene Dienste ausprobiert, nutze den GPT-Chat seit mehreren Monaten - er ist unverzichtbar. Danke, dass Sie es mir zugänglich gemacht haben.",
    },
    {
      id: 5,
      email: "anna.petrenko@mail.com",
      rating: 5,
      comment:
        "Ich bin begeistert! 300 UAH gespart und ich schaue buchstäblich den ganzen Tag Netflix) Danke 🤍",
    },
    {
      id: 6,
      username: "Vitalii",
      rating: 5,
      comment:
        "Vielen Dank für Ihre Arbeit! Abonnements sind tatsächlich günstiger, alles ist schnell und bequem. Ich nutze es mit Vergnügen, alles funktioniert hervorragend.",
    },
    {
      id: 7,
      email: "dmytro.levchuk@ukr.net",
      rating: 5,
      comment:
        "Einfach danke für den Service! Ich habe früher eine ähnliche Methode mit Freunden verwendet, aber hier kann man ziemlich gut sparen. Herzlichen Dank und ich wünsche Ihnen viel Erfolg!",
    },
    {
      id: 8,
      username: "Tetiana",
      rating: 4,
      comment:
        "Ein Service, der mir Geld spart. Bequem und effektiv. Ich freue mich auf die Erweiterung der verfügbaren Dienste für Abonnements.",
    },
    {
      id: 9,
      username: "Yuliia",
      rating: 5,
      comment:
        "Die Besten! Support in Telegram ist eine separate Liebe! Ich habe 1000 Fragen gestellt, sie haben alle beantwortet und geholfen ♥️",
    },
    {
      id: 10,
      username: "Serhii",
      rating: 5,
      comment:
        "Ich kann mir gar nicht vorstellen, wie ich früher ohne euch ausgekommen bin) Ich empfehle es allen!",
    },
    {
      id: 11,
      username: "Olena",
      rating: 5,
      comment:
        "Ihr Service ist wirklich ein wahrer Fund! Erschwingliche Abonnements, ausgezeichnete Qualität und vor allem - erhebliche Einsparungen ) Jetzt nutzen auch alle meine Freunde es!",
    },
    {
      id: 12,
      username: "Maksym",
      rating: 5,
      comment:
        "Ich habe euch meinen Freunden empfohlen, die Netflix direkt gekauft haben. Ich sagte ihnen, dass es so billiger ist! Jetzt benutzen wir es alle zusammen! Alles ist großartig!",
    },
  ];

  // Translations for Czech
  const czechReviews = [
    {
      id: 1,
      email: "ivanov123@ukr.net",
      rating: 4,
      comment:
        "Jeden z nejlepších servisů! Doporučili mi přátelé, ale je to prostě skvělé — předplatné je o 50-70 % levnější. Doporučuji vyzkoušet!",
    },
    {
      id: 2,
      username: "Marina",
      rating: 5,
      comment:
        "Jsem velmi spokojená s předplatným. Podpora je výborná, rychle odpovídají a pomohli mi s připojením jednoho z nich v zahraničí. Nekonečně vděčná!!!",
    },
    {
      id: 3,
      email: "pavlo.d@gmail.com",
      rating: 5,
      comment:
        "Jsem maximálně ohromen jejich laskavostí a ochotou řešit všechny komplikace! Takovou technickou podporu jsem ještě nezažil. Velmi vděčný!",
    },
    {
      id: 4,
      username: "Oleksii",
      rating: 5,
      comment:
        "Vyzkoušel jsem různé služby, už několik měsíců používám GPT chat – je to nenahraditelné. Děkuji, že jste mi to zpřístupnili.",
    },
    {
      id: 5,
      email: "anna.petrenko@mail.com",
      rating: 5,
      comment:
        "Jsem nadšená! Ušetřila jsem 300 UAH a sleduji Netflix doslova celý den) Děkuji 🤍",
    },
    {
      id: 6,
      username: "Vitalii",
      rating: 5,
      comment:
        "Velké díky za vaši práci! Předplatné je skutečně levnější, vše je rychlé a pohodlné. Používám s radostí, vše funguje skvěle.",
    },
    {
      id: 7,
      email: "dmytro.levchuk@ukr.net",
      rating: 5,
      comment:
        "Prostě díky za službu! Dříve jsem používal podobný způsob s přáteli, ale tady lze opravdu pěkně ušetřit. Upřímně děkuji a přeji úspěch!",
    },
    {
      id: 8,
      username: "Tetiana",
      rating: 4,
      comment:
        "Služba, která mi šetří peníze. Pohodlné a efektivní. Těším se na rozšíření služeb dostupných pro předplatné.",
    },
    {
      id: 9,
      username: "Yuliia",
      rating: 5,
      comment:
        "Nejlepší! Podpora na Telegramu je samostatná láska! Položila jsem 1000 otázek, na vše odpověděli a pomohli ♥️",
    },
    {
      id: 10,
      username: "Serhii",
      rating: 5,
      comment:
        "Ani si nedokážu představit, jak jsem bez vás dříve fungoval) Doporučuji všem!",
    },
    {
      id: 11,
      username: "Olena",
      rating: 5,
      comment:
        "Vaše služba je opravdu skvělý objev! Dostupné předplatné, vynikající kvalita a hlavně – značné úspory ) Teď ji používají i všichni moji přátelé!",
    },
    {
      id: 12,
      username: "Maksym",
      rating: 5,
      comment:
        "Doporučil jsem vás přátelům, kteří kupovali Netflix přímo. Řekl jsem jim, že takto je to levnější! Teď to používáme všichni společně! Vše je skvělé!",
    },
  ];

  // Function to get reviews based on locale
  const getLocalizedReviews = () => {
    switch (locale) {
      case "en":
        return englishReviews;
      case "de":
        return germanReviews;
      case "cz":
        return czechReviews;
      case "ua":
      default:
        return originalReviews;
    }
  };

  // Banner translations
  const bannerTranslations = {
    ua: {
      users: "10 000+",
      usersText: "АКТИВНИХ КОРИСТУВАЧІВ ПЛАТФОРМИ",
      savings: "4300 грн",
      savingsText: "СЕРЕДНЯ ЕКОНОМІЯ НА РІК",
    },
    en: {
      users: "10,000+",
      usersText: "ACTIVE PLATFORM USERS",
      savings: "$180",
      savingsText: "AVERAGE YEARLY SAVINGS",
    },
    de: {
      users: "10.000+",
      usersText: "AKTIVE PLATTFORMNUTZER",
      savings: "€180",
      savingsText: "DURCHSCHNITTLICHE JÄHRLICHE EINSPARUNG",
    },
    cz: {
      users: "10 000+",
      usersText: "AKTIVNÍ UŽIVATELÉ PLATFORMA",
      savings: "2300 Kč",
      savingsText: "PRŮMĚRNÁ ROČNÍ ÚSPORA",
    },
  };

  const getBannerContent = () => {
    return bannerTranslations[locale] || bannerTranslations["en"];
  };

  const bannerContent = getBannerContent();
  const reviews = getLocalizedReviews();

  const getItemsPerSlide = () => {
    return isMobile ? 2 : 4;
  };

  const totalSlides = Math.ceil(reviews.length / getItemsPerSlide());

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="w-full bg-cyan-500 min-h-54 md:min-h-44 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16">
        <div>
          <div className="flex justify-center items-baseline space-x-4 mb-2">
            <span className="text-4xl md:text-5xl font-bold text-white">
              {bannerContent.users}
            </span>
          </div>
          <p className="text-sm text-black uppercase font-bold">
            {bannerContent.usersText}
          </p>
        </div>
        <div>
          <div className="flex justify-center items-baseline space-x-4 mb-2">
            <span className="text-4xl md:text-5xl font-bold text-white">
              {bannerContent.savings}
            </span>
          </div>
          <p className="text-sm text-black uppercase font-bold">
            {bannerContent.savingsText}
          </p>
        </div>
      </section>
      <section
        className="w-full mx-auto flex flex-col items-center justify-center overflow-hidden py-12 px-4 bg-gray-50 pt-24"
        id="comments"
      >
        <div className="w-full max-w-5xl flex flex-col">
          <header className="w-full flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              {useClientTranslation("user_comments")}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer  ${
                    currentSlide === 0 ? "opacity-50 pointer-events-none" : ""
                  }`}
                  aria-label="Previous slide"
                >
                  <MdKeyboardArrowLeft className="text-gray-500 text-3xl hover:text-white transition-colors" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors"
                  aria-label="Next slide"
                >
                  <MdKeyboardArrowRight className="text-gray-500 text-3xl hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </header>

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
                >
                  {reviews
                    .slice(
                      slideIndex * getItemsPerSlide(),
                      (slideIndex + 1) * getItemsPerSlide()
                    )
                    .map((review) => (
                      <ReviewItem key={review.id} {...review} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
