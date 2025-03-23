"use client";
import { useState, useEffect } from "react";
const subscriptions = [
  {
    id: 1,
    title: "Basic Plan",
    description:
      "Perfect for beginners. Access to all standard features with limited streaming quality.",
    price: "9.99",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Premium Plan",
    description:
      "Our most popular option. High-quality streaming and access to exclusive content.",
    price: "14.99",
    color: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  },
  {
    id: 3,
    title: "Family Plan",
    description:
      "Share with your loved ones. Up to 5 profiles with premium features for everyone.",
    price: "19.99",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === subscriptions.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === subscriptions.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? subscriptions.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full h-screen min-h-96 max-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {subscriptions.map((subscription, index) => (
          <div
            key={subscription.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full ${subscription.color}`}
            ></div>
            <div className="flex flex-col justify-center h-full max-w-3xl mx-auto px-4 md:px-8 relative z-10">
              <div className="md:w-1/2 w-full text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {subscription.title}
                </h1>
                <p className="text-lg mb-8 opacity-90">
                  {subscription.description}
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-bold">
                    ${subscription.price}
                  </span>
                  <span className="ml-2 opacity-80">/month</span>
                </div>
                <button className="bg-white text-indigo-900 py-3 px-8 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-20">
        {subscriptions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-10"
                : "bg-white bg-opacity-50"
            } cursor-pointer`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center text-white z-20 hover:bg-opacity-50 transition-all duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center text-white z-20 hover:bg-opacity-50 transition-all duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
}
