"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useParams } from "next/navigation";
import {
  useSubscriptionPayments,
  useUsers,
  useSubscriptions,
} from "@/context/hooks";
import { getMonthsUa } from "@/app/funcs/getMonthsUa";

export default function MyProfile() {
  const { data: session, update } = useSession();
  const { users, fetchUsers } = useUsers();
  const { subscriptions } = useSubscriptions();
  const { subscriptionPayments: fetchedSubscriptionPayments } =
    useSubscriptionPayments();
  const currentUser = users.find((user) => user.id === session?.user.id);

  const filteredSubscriptionPayments = fetchedSubscriptionPayments.filter(
    (payment) => payment.userId === currentUser?.id
  );

  const successfulPayments = filteredSubscriptionPayments.filter(
    (payment) => payment.status === "success"
  );

  const subscriptionPayments = useMemo(() => {
    return successfulPayments.map((payment) => {
      // Знаходимо відповідну підписку за id
      const subscription = subscriptions.find(
        (sub) => sub.id === payment.subscriptionId
      );

      return {
        id: payment.id,
        status: payment.endDate != new Date() ? "active" : "completed",
        price: payment.price,
        startDate: payment.startDate,
        endDate: payment.endDate,
        duration: payment.duration,
        locale: payment.locale,
        subscriptionId: payment.subscriptionId,
        // Додаємо об'єкт підписки для зручного доступу
        subscription: subscription || {
          id: payment.subscriptionId,
          title: "Unknown Subscription",
          title_ua: "Невідома підписка",
          title_de: "Unbekanntes Abonnement",
        },
      };
    });
  }, [filteredSubscriptionPayments, subscriptions]);

  console.log("subscriptionPayments", subscriptionPayments);

  const allPayments = useMemo(() => {
    return filteredSubscriptionPayments
      .filter((payment) => {
        return payment.status === "success" || payment.status === "failure";
      })
      .map((payment) => {
        // Знаходимо відповідну підписку за id
        const subscription = subscriptions.find(
          (sub) => sub.id === payment.subscriptionId
        );

        return {
          id: payment.id,
          status: payment.status,
          price: payment.price,
          startDate: payment.startDate,
          endDate: payment.endDate,
          duration: payment.duration,
          locale: payment.locale,
          subscriptionId: payment.subscriptionId,
          // Додаємо об'єкт підписки для зручного доступу
          subscription: subscription || {
            id: payment.subscriptionId,
            title: "Unknown Subscription",
            title_ua: "Невідома підписка",
            title_de: "Unbekanntes Abonnement",
          },
        };
      });
  }, [filteredSubscriptionPayments, subscriptions]);

  console.log("allPayments", allPayments);

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
  // const perMonthText = useClientTranslation("perMonth");
  const monthText = useClientTranslation("month");
  const monthsText = useClientTranslation("months");
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

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
                            {formatDate(subscription.startDate!)} |{" "}
                            {endDateText}: {formatDate(subscription.endDate!)}
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
                        {subscription.price} / {subscription.duration}{" "}
                        {locale === "ua"
                          ? getMonthsUa(subscription.duration)
                          : Number(subscription.duration) === 1
                          ? monthText
                          : monthsText}
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
                            {formatDate(subscription.startDate!)} |{" "}
                            {endDateText}: {formatDate(subscription.endDate!)}
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
                        {subscription.price} / {subscription.duration}{" "}
                        {locale === "ua"
                          ? getMonthsUa(subscription.duration)
                          : Number(subscription.duration) === 1
                          ? monthText
                          : monthsText}
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
            {allPayments.filter((pay) => pay.startDate).length > 0 ? (
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
                    {allPayments
                      .filter((pay) => pay.startDate)
                      .map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">
                            {formatDate(payment.startDate!)}
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
                                payment.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "failure"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {payment.status === "success"
                                ? successfulText
                                : payment.status === "failure"
                                ? failedText
                                : pendingText}
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
