"use client";

import { useClientTranslation } from "@/app/hooks/useTranslate";
import ReviewItem from "./reviewItem";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import CommentModal from "./commentModal";
export default function ReviewsContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = [
    {
      email: "lgovody@ukr.net",
      rating: 4,
      comment: "Прекрасний Сервіс. Рік вже дивлюсь Filmix Pro без проблем .",
    },
    {
      username: "vadim",
      rating: 0,
      comment: "Как подключить мегого?вы супер все работает!",
    },
    {
      email: "onevardd@gmail.com",
      rating: 5,
      comment:
        "Взял Netflix - восторг. Все работает как часы. Планирую еще GPT+ взять",
    },
    {
      username: "Катерина",
      rating: 1,
      comment: "Чудовий сервіс ,підтримка завжди на зв'язку 👍👍👍",
    },
    {
      email: "onevardd@gmail.com",
      rating: 5,
      comment:
        "Взял Netflix - восторг. Все работает как часы. Планирую еще GPT+ взять",
    },
    {
      username: "Катерина",
      rating: 2,
      comment: "Чудовий сервіс ,підтримка завжди на зв'язку 👍👍👍",
    },
    {
      email: "onevardd@gmail.com",
      rating: 5,
      comment:
        "Взял Netflix - восторг. Все работает как часы. Планирую еще GPT+ взять",
    },
    {
      username: "Катерина",
      rating: 3,
      comment: "Чудовий сервіс ,підтримка завжди на зв'язку 👍👍👍",
    },
  ];
  const totalSlides = Math.ceil(reviews.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
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
                onClick={() => {
                  setIsModalOpen(true);
                }}
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
                  className="w-full flex-shrink-0 grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-6 p-2"
                >
                  {reviews
                    .slice(slideIndex * 2, slideIndex * 2 + (isMobile ? 2 : 4))
                    .map((review, reviewIndex) => (
                      <ReviewItem key={reviewIndex} {...review} />
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
