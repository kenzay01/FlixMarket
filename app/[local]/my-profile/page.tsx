"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import type { SubscriptionPayment } from "../../../types/subscriptionPayment";
import { useParams } from "next/navigation";
import { useUsers } from "@/context/hooks";

export default function MyProfile() {
  const { data: session, update } = useSession();
  const { users, fetchUsers } = useUsers();
  const currentUser = users.find((user) => user.id === session?.user.id);

  const [subscriptionPayments, setSubscriptionPayments] = useState<
    SubscriptionPayment[]
  >([]);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "payments">(
    "subscriptions"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const profileText = useClientTranslation("profile");
  const subscriptionsText = useClientTranslation("subscriptions");
  const activeSubscriptionsText = useClientTranslation("activeSubscriptions");
  const completedSubscriptionsText = useClientTranslation(
    "completedSubscriptions"
  );
  const paymentHistoryText = useClientTranslation("paymentHistory");
  const noActiveSubscriptionsText = useClientTranslation(
    "noActiveSubscriptions"
  );
  const noCompletedSubscriptionsText = useClientTranslation(
    "noCompletedSubscriptions"
  );
  const noPaymentHistoryText = useClientTranslation("noPaymentHistory");
  const startDateText = useClientTranslation("startDate");
  const endDateText = useClientTranslation("endDate");
  const priceText = useClientTranslation("price");
  const perMonthText = useClientTranslation("perMonth");
  const activeText = useClientTranslation("active");
  const completedText = useClientTranslation("completed");
  const dateText = useClientTranslation("date");
  const subscriptionText = useClientTranslation("subscription");
  const amountText = useClientTranslation("amount");
  const statusText = useClientTranslation("status");
  const successfulText = useClientTranslation("successful");
  const pendingText = useClientTranslation("pending");
  const failedText = useClientTranslation("failed");
  const editProfileText = useClientTranslation("editProfile");
  const nameText = useClientTranslation("name");
  const emailText = useClientTranslation("email");
  const saveText = useClientTranslation("save");
  const cancelText = useClientTranslation("cancel");

  useEffect(() => {
    if (session?.user && currentUser) {
      setUserName(currentUser?.name || session.user.name || "");
      setUserEmail(currentUser?.email || session.user.email || "");
    }
  }, [session, users]);

  useEffect(() => {
    // Тут має бути запит до API
    const mockSubscriptionPayments: SubscriptionPayment[] = [
      {
        id: "1",
        status: "active",
        startDate: "2025-02-15",
        endDate: "2025-03-15",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "sub-comp-1",
        status: "completed",
        startDate: "2025-02-15",
        endDate: "2025-03-15",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "sub-comp-2",
        status: "completed",
        startDate: "2024-11-10",
        endDate: "2025-02-10",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "2",
          title: "Professional Plan",
          title_de: "Profi-Plan",
          title_ua: "Професійний план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "pay-1",
        status: "successful",
        date: "2025-02-15",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "pay-2",
        status: "successful",
        date: "2025-01-10",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "pay-3",
        status: "successful",
        date: "2024-12-10",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
      {
        id: "pay-4",
        status: "successful",
        date: "2024-11-10",
        price: 29.99,
        locale: "en",
        subscription: {
          id: "1",
          title: "Basic Plan",
          title_de: "Basis-Plan",
          title_ua: "Базовий план",
        },
        // user: {
        //   id: "2",
        //   name: "Test",
        //   email: "test@gmail.com",
        //   role: "user",
        // },
      },
    ];

    setSubscriptionPayments(mockSubscriptionPayments);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Зберегти зміни в профілі користувача
  // Зберегти зміни в профілі користувача
  const handleSaveProfile = async () => {
    try {
      // Зробити запит до API для оновлення інформації користувача
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: currentUser?.email,
          newEmail: userEmail,
        }),
      });

      // Перевірка відповіді від API
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Оновлення сесії після успішного оновлення профілю
      await update({
        ...session,
        user: {
          ...session?.user,
          name: userName,
          email: userEmail,
        },
      });

      fetchUsers(); // Оновлення списку користувачів
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{profileText}</h1>

      {session?.user && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          {isEditing ? (
            <div className="space-y-4">
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
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
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
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setUserName(currentUser?.name || session.user.name || "");
                    setUserEmail(
                      currentUser?.email || session.user.email || ""
                    );
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-700 cursor-pointer"
                >
                  {saveText}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{userName}</h2>
                  <p className="text-gray-600">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {editProfileText}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "subscriptions"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
              }`}
            >
              {subscriptionsText}
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "payments"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
              }`}
            >
              {paymentHistoryText}
            </button>
          </nav>
        </div>

        {activeTab === "subscriptions" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {activeSubscriptionsText}
            </h3>
            {subscriptionPayments.filter((sub) => sub.status === "active")
              .length > 0 ? (
              <div className="space-y-4">
                {subscriptionPayments
                  .filter((sub) => sub.status === "active")
                  .map((subscription) => (
                    <div
                      key={subscription.id}
                      className="p-4 bg-white rounded shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {locale === "en"
                              ? subscription.subscription.title
                              : locale === "ua"
                              ? subscription.subscription.title_ua
                              : subscription.subscription.title_de}
                          </h4>
                          <div className="text-sm text-gray-500 mt-1">
                            {startDateText}:{" "}
                            {formatDate(subscription.startDate!)} |{endDateText}
                            : {formatDate(subscription.endDate!)}
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {activeText}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        {priceText}:{" "}
                        {subscription.locale === "en"
                          ? "$"
                          : subscription.locale === "ua"
                          ? "₴"
                          : "€"}
                        {subscription.price} {perMonthText}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">{noActiveSubscriptionsText}</p>
            )}

            <h3 className="text-lg font-semibold mb-3 mt-6">
              {completedSubscriptionsText}
            </h3>
            {subscriptionPayments.filter((sub) => sub.status === "completed")
              .length > 0 ? (
              <div className="space-y-4">
                {subscriptionPayments
                  .filter((sub) => sub.status === "completed")
                  .map((subscription) => (
                    <div
                      key={subscription.id}
                      className="p-4 bg-white rounded shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {locale === "en"
                              ? subscription.subscription.title
                              : locale === "ua"
                              ? subscription.subscription.title_ua
                              : subscription.subscription.title_de}
                          </h4>
                          <div className="text-sm text-gray-500 mt-1">
                            {startDateText}:{" "}
                            {formatDate(subscription.startDate!)} |{endDateText}
                            : {formatDate(subscription.endDate!)}
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {completedText}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        {priceText}:{" "}
                        {subscription.locale === "en"
                          ? "$"
                          : subscription.locale === "ua"
                          ? "₴"
                          : "€"}
                        {subscription.price} {perMonthText}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">{noCompletedSubscriptionsText}</p>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">{paymentHistoryText}</h3>
            {subscriptionPayments.filter((pay) => pay.date).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dateText}
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {subscriptionText}
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {amountText}
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {statusText}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscriptionPayments
                      .filter((pay) => pay.date)
                      .map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">
                            {formatDate(payment.date!)}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {locale === "en"
                              ? payment.subscription.title
                              : locale === "ua"
                              ? payment.subscription.title_ua
                              : payment.subscription.title_de}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {payment.locale === "en"
                              ? "$"
                              : payment.locale === "ua"
                              ? "₴"
                              : "€"}{" "}
                            {payment.price}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                payment.status === "successful"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status === "successful"
                                ? successfulText
                                : payment.status === "pending"
                                ? pendingText
                                : failedText}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">{noPaymentHistoryText}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
