// src/app/[locale]/payment/success/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaSpinner, FaHome, FaPaperPlane } from "react-icons/fa";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useSubscriptionPayments } from "@/context/hooks";

interface PaymentStatus {
  status: string;
  subscription?: {
    title?: string;
    title_ua?: string;
    title_de?: string;
    title_cs?: string;
    title_pl?: string;
  };
  price?: number;
  startDate?: string;
  endDate?: string;
}

interface UserFormData {
  name: string;
  phone: string;
  email: string;
  time?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function PaymentSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.local as string;
  const paymentId = searchParams.get("paymentId");
  const { fetchSubscriptionPayments } = useSubscriptionPayments();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // Додаємо стан для помилок

  // Translations
  // const useClientTranslation = (key, fallback: string): string => {
  //   const translation = useClientTranslation(key);
  //   if (translation && translation !== key.toLowerCase()) {
  //     return translation;
  //   }
  //   return fallback;
  // };

  const homeText = useClientTranslation("back");
  const successText = useClientTranslation("payment_success");
  const processingText = useClientTranslation("payment_processing");
  const errorText = useClientTranslation("payment_error");
  const subscriptionText = useClientTranslation("subscription");
  const validUntilText = useClientTranslation("valid_until");
  const checkingText = useClientTranslation("checking_status");
  const amountText = useClientTranslation("amount");
  const nameText = useClientTranslation("name");
  const phoneText = useClientTranslation("phone");
  const emailText = useClientTranslation("email");
  const submitText = useClientTranslation("submit");
  const submitSuccessText = useClientTranslation("submit_success");
  const fillFormText = useClientTranslation("fill_form");
  const failureText = useClientTranslation("payment_failure");
  const invalidPhoneText = useClientTranslation("invalid_phone");
  const invalidEmailText = useClientTranslation("invalid_email");

  useEffect(() => {
    if (!paymentId) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment/status?id=${paymentId}`);
        const data = await response.json();

        if (response.ok) {
          setPaymentStatus(data);
        } else {
          console.error("Error fetching payment status:", data.error);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
    const interval = setInterval(() => {
      if (!formSubmitted) {
        checkPaymentStatus();
      }
    }, 5000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [paymentId, formSubmitted]);

  useEffect(() => {
    fetchSubscriptionPayments();
  }, []);

  const getSubscriptionTitle = () => {
    if (!paymentStatus?.subscription) return "";

    return locale === "ua"
      ? paymentStatus.subscription.title_ua || paymentStatus.subscription.title
      : locale === "de"
      ? paymentStatus.subscription.title_de || paymentStatus.subscription.title
      : locale === "cz"
      ? paymentStatus.subscription.title_cs || paymentStatus.subscription.title
      : paymentStatus.subscription.title;
  };

  const formatDate = (dateString?: string, needMore?: boolean) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Невалідна дата";

    const localeValue =
      locale === "ua"
        ? "uk-UA"
        : locale === "de"
        ? "de-DE"
        : locale === "cz"
        ? "cs-CZ"
        : "en-US";

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Kyiv",
    };

    if (needMore) {
      options.hour = "numeric";
      options.minute = "numeric";
      options.hour12 = false;
    }

    // console.log("Input date in UTC:", date.toISOString());
    return new Intl.DateTimeFormat(localeValue, options).format(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаємо помилку для цього поля при зміні
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // Функція валідації
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Валідація імені (необов'язкова, але перевіримо, чи не порожнє)
    if (!formData.name.trim()) {
      errors.name =
        locale === "ua"
          ? "Введіть ім'я"
          : locale === "de"
          ? "Bitte geben Sie Ihren Namen ein"
          : locale === "cz"
          ? "Zadejte své jméno"
          : "Please enter your name";
    }

    const phoneRegex = /^\+?\d{6,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = invalidPhoneText;
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = invalidEmailText;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Повертаємо true, якщо немає помилок
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Виконуємо валідацію
    const isValid = validateForm();
    if (!isValid) {
      return; // Якщо є помилки, не відправляємо форму
    }

    setFormSubmitting(true);

    const subscriptionTitle = getSubscriptionTitle();
    const validUntil = formatDate(paymentStatus?.endDate, false);
    const price = paymentStatus?.price || 0;
    const currency =
      locale === "ua"
        ? "грн"
        : locale === "de"
        ? "€"
        : locale === "cz"
        ? "Kč "
        : "$";
    const currentTime = new Date().toISOString();

    try {
      function escapeMarkdown(text: string): string {
        const specialChars = [
          "_",
          "*",
          "[",
          "]",
          "(",
          ")",
          "~",
          "`",
          ">",
          "#",
          "+",
          "-",
          "=",
          "|",
          "{",
          "}",
          ".",
          "!",
        ];

        let escapedText = text;
        specialChars.forEach((char) => {
          const regex = new RegExp("\\" + char, "g");
          escapedText = escapedText.replace(regex, "\\" + char);
        });

        return escapedText;
      }

      const messageText = `
      🔔 *Нова успішна підписка*

        📌 *Деталі підписки:*
        \\- Тип: ${escapeMarkdown(subscriptionTitle)}
        \\- Термін дії до: ${escapeMarkdown(validUntil)}
        \\- Сума: ${price} ${currency}\\.
        👤 *Інформація про користувача:*
        \\- Ім'я: ${escapeMarkdown(formData.name)}
        \\- Телефон: ${escapeMarkdown(formData.phone)}
        \\- Email: ${escapeMarkdown(formData.email)}
        \\- Час: ${escapeMarkdown(formatDate(currentTime, true))}
        \\- Країна: ${
          locale === "ua"
            ? "UA"
            : locale === "de"
            ? "DE"
            : locale === "cz"
            ? "CZ"
            : "EN"
        }
      `.trim();

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        console.error("Failed to send data to Telegram");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  const renderUserForm = () => {
    if (formSubmitted) {
      return (
        <div className="mt-6 text-center">
          <FaCheckCircle className="inline-block text-green-500 text-3xl mb-3" />
          <p className="text-lg font-medium text-green-600">
            {submitSuccessText}
          </p>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          {fillFormText}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {nameText}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              {phoneText}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+12025550123"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {emailText}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {formSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> {submitText}
                </>
              ) : (
                <>
                  <FaPaperPlane /> {submitText}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
          <h2 className="text-xl">{checkingText}</h2>
        </div>
      );
    }

    if (!paymentStatus) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600">{errorText}</h2>
          <p className="mt-2 text-gray-600">
            {locale === "ua"
              ? "Не вдалося отримати інформацію про платіж"
              : locale === "de"
              ? "Zahlungsinformationen konnten nicht abgerufen werden"
              : locale === "cz"
              ? "Nepodařilo se získat informace o platbě"
              : "Could not retrieve payment information"}
          </p>
        </div>
      );
    }

    switch (paymentStatus.status) {
      case "paid":
      case "success":
        return (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-green-600">{successText}</h2>
            <div className="mt-8 bg-gray-100 p-6 rounded-lg w-full max-w-md">
              <p className="text-gray-700">
                <span className="font-semibold">{subscriptionText}:</span>{" "}
                {getSubscriptionTitle()}
              </p>
              {paymentStatus.price && (
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">{amountText}:</span>{" "}
                  {paymentStatus.price}
                  {locale === "ua" ? " грн" : locale === "de" ? " €" : " $"}
                </p>
              )}
              {paymentStatus.startDate && paymentStatus.endDate && (
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">{validUntilText}:</span>{" "}
                  {formatDate(paymentStatus.endDate, false)}
                </p>
              )}
            </div>

            {renderUserForm()}
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold text-indigo-600">
              {processingText}
            </h2>
            <p className="mt-2 text-gray-600">
              {locale === "ua"
                ? "Ваш платіж обробляється. Це може зайняти кілька хвилин."
                : locale === "de"
                ? "Ihre Zahlung wird bearbeitet. Dies kann einige Minuten dauern."
                : locale === "cz"
                ? "Vaše platba se zpracovává. Může to trvat několik minut."
                : "Your payment is being processed. This may take a few minutes."}
            </p>
          </div>
        );

      case "failure":
        return (
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600">{failureText}</h2>
            <p className="mt-2 text-gray-600">
              {locale === "ua"
                ? "На жаль, ваш платіж не вдалося обробити."
                : locale === "de"
                ? "Leider konnte Ihre Zahlung nicht bearbeitet werden."
                : locale === "cz"
                ? "Bohužel se vaši platbu nepodařilo zpracovat."
                : "Unfortunately, your payment could not be processed."}
            </p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600">{errorText}</h2>
            <p className="mt-2 text-gray-600">
              {locale === "ua"
                ? "Статус платежу: " + paymentStatus.status
                : locale === "de"
                ? "Zahlungsstatus: " + paymentStatus.status
                : locale === "cz"
                ? "Stav platby: " + paymentStatus.status
                : "Payment status: " + paymentStatus.status}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        {renderContent()}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push(`/${locale}`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 transition shadow-md"
          >
            <FaHome /> {homeText}
          </button>
        </div>
      </div>
    </div>
  );
}
