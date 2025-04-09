// src/app/[locale]/payment/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaSpinner, FaHome } from "react-icons/fa";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useSubscriptionPayments } from "@/context/hooks";

interface PaymentStatus {
  status: string;
  subscription?: {
    title?: string;
    title_ua?: string;
    title_de?: string;
  };
  startDate?: string;
  endDate?: string;
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

  const homeText = useClientTranslation("back") || "Back";
  const successText =
    useClientTranslation("payment_success") || "Payment Successful";
  const processingText =
    useClientTranslation("payment_processing") || "Payment Processing";
  const errorText = useClientTranslation("payment_error") || "Payment Error";
  const subscriptionText =
    useClientTranslation("subscription") || "Subscription";
  const validUntilText = useClientTranslation("valid_until") || "Valid until";
  const checkingText =
    useClientTranslation("checking_status") || "Checking payment status...";

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

    // Періодично перевіряємо статус платежу (кожні 5 секунд)
    const interval = setInterval(checkPaymentStatus, 5000);

    // Очищаємо інтервал після 1 хвилини або коли платіж оброблено
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [paymentId]);

  useEffect(() => {
    fetchSubscriptionPayments();
  }, []);

  const getSubscriptionTitle = () => {
    if (!paymentStatus?.subscription) return "";

    return locale === "ua"
      ? paymentStatus.subscription.title_ua || paymentStatus.subscription.title
      : locale === "de"
      ? paymentStatus.subscription.title_de || paymentStatus.subscription.title
      : paymentStatus.subscription.title;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      locale === "ua" ? "uk-UA" : locale === "de" ? "de-DE" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(date);
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
              : "Could not retrieve payment information"}
          </p>
        </div>
      );
    }

    switch (paymentStatus.status) {
      case "paid":
        return (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-green-600">{successText}</h2>
            <div className="mt-8 bg-gray-100 p-6 rounded-lg w-full max-w-md">
              <p className="text-gray-700">
                <span className="font-semibold">{subscriptionText}:</span>{" "}
                {getSubscriptionTitle()}
              </p>
              {paymentStatus.startDate && paymentStatus.endDate && (
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">{validUntilText}:</span>{" "}
                  {formatDate(paymentStatus.endDate)}
                </p>
              )}
            </div>
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
                : "Your payment is being processed. This may take a few minutes."}
            </p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center">
            {paymentStatus.status !== "success" ? (
              <>
                <div className="text-red-500 text-5xl mb-4">❌</div>
                <h2 className="text-2xl font-bold text-red-600">{errorText}</h2>
              </>
            ) : (
              <>
                <div className="text-green-500 text-5xl mb-4">✔️</div>
              </>
            )}
            <p className="mt-2 text-gray-600">
              {locale === "ua"
                ? "Статус платежу: " + paymentStatus.status
                : locale === "de"
                ? "Zahlungsstatus: " + paymentStatus.status
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
