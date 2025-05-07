"use client";

import { useEffect, useState } from "react";

import type { User } from "../../../../types/user";
import type { Subscription } from "../../../../types/subscriptions";

import {
  useUsers,
  useSubscriptionPayments,
  useSubscriptions,
} from "@/context/hooks";

interface ActiveSubscriptionWithDetails extends Subscription {
  paymentId: string;
  startDate: string;
  endDate?: string;
  calculatedEndDate: Date;
  price: number;
  locale: string;
  duration: string;
  localizedTitle: string;
}

interface EnhancedUser extends User {
  activeSubscriptions?: ActiveSubscriptionWithDetails[];
  totalSubscriptions?: number;
}

export default function AdminDashboard() {
  const { users: fetchedUsers } = useUsers();
  const { subscriptions: fetchedSubscriptions } = useSubscriptions();
  const { subscriptionPayments: fetchedSubscriptionPayments } =
    useSubscriptionPayments();
  // console.log("fetchedSubscriptionPayments", fetchedSubscriptionPayments);

  useEffect(() => {
    if (fetchedUsers && fetchedSubscriptionPayments && fetchedSubscriptions) {
      const processedUsers: EnhancedUser[] = [...fetchedUsers].map((user) => {
        const userPayments = fetchedSubscriptionPayments.filter(
          (payment) =>
            payment.userId === user.id && payment.status === "success"
        );

        const activePayments = userPayments.filter((payment) => {
          return payment.endDate && payment.endDate > payment.startDate;
        });

        const activeSubscriptions = activePayments
          .map((payment) => {
            const subscription = fetchedSubscriptions.find(
              (sub) => sub.id === payment.subscriptionId
            );

            if (subscription) {
              let title = subscription.title;

              if (payment.locale === "ua" && subscription.title_ua) {
                title = subscription.title_ua;
              } else if (payment.locale === "de" && subscription.title_de) {
                title = subscription.title_de;
              } else if (payment.locale === "cz" && subscription.title_cs) {
                title = subscription.title_cs;
              }

              const startDate = new Date(payment.startDate);
              let months = 0;
              switch (payment.duration) {
                case "1":
                  months = 1;
                  break;
                case "3":
                  months = 3;
                  break;
                case "6":
                  months = 6;
                  break;
                case "12":
                  months = 12;
                  break;
                default:
                  months = 0;
              }

              const calculatedEndDate = new Date(startDate);
              calculatedEndDate.setMonth(startDate.getMonth() + months);

              const startDateStr = payment.startDate.toString();
              const endDateStr = payment.endDate
                ? payment.endDate.toString()
                : undefined;

              return {
                ...subscription,
                paymentId: payment.id,
                startDate: startDateStr,
                endDate: endDateStr,
                calculatedEndDate,
                price: payment.price,
                locale: payment.locale,
                duration: payment.duration,
                localizedTitle: title,
              } as ActiveSubscriptionWithDetails;
            }
            return null;
          })
          .filter((sub): sub is ActiveSubscriptionWithDetails => sub !== null);

        const totalSubscriptions = userPayments.length;

        return {
          ...user,
          activeSubscriptions,
          totalSubscriptions,
        } as EnhancedUser;
      });

      setUsers(processedUsers);
    }
  }, [fetchedUsers, fetchedSubscriptionPayments, fetchedSubscriptions]);

  const [users, setUsers] = useState<EnhancedUser[]>([]);
  // console.log("users", users);
  // const [totalUsers, setTotalUsers] = useState(0);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white shadow-lg rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-700">
            Загальна кількість підписок
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            {users.reduce(
              (sum, user) => sum + (user.totalSubscriptions || 0),
              0
            )}
          </p>
        </div>

        {/* <div className="p-4 bg-white shadow-lg rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-700">
            Загальна кількість підписок
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            {totalSubscriptions}
          </p>
        </div> */}
      </div>

      <h2 className="text-2xl font-semibold mb-4 ml-4">Користувачі</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 max-h-[500px] overflow-y-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Імя
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Активні підписки
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Всього підписок
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.activeSubscriptions?.length
                    ? user.activeSubscriptions.map((sub) => (
                        <div key={sub.id} className="p-2 border mb-2">
                          <strong>{sub.localizedTitle}</strong>
                          <p>Тривалість: {sub.duration} (місяць)</p>
                          <p className="text-xs text-gray-400">
                            Дійсна до:{" "}
                            {new Date(sub.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    : "Немає активної підписки"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.totalSubscriptions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
