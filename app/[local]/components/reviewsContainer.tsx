"use client";

import { useClientTranslation } from "@/app/hooks/useTranslate";
import ReviewItem from "./reviewItem";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import CommentModal from "./commentModal";
export default function ReviewsContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reviews = [
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

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <>
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 rounded-full border border-b-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
              >
                {useClientTranslation("add_comment")}
              </button>
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
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
