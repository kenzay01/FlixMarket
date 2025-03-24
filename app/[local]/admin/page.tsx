"use client";

import { useEffect, useState } from "react";

import type { User } from "../../../types/user";

const mockUsers: User[] = [
  {
    id: "1",
    name: "Іван",
    email: "ivan@example.com",
    activeSubscriptions: [
      {
        id: "sub1",
        title: "Premium Plan",
        description: "Access to all features",
        price_per_3months: 29.99,
      },
      {
        id: "sub2",
        title: "Basic Plan",
        description: "Access to basic features",
        price_per_3months: 9.99,
      },
    ],
    totalSubscriptions: 2,
  },
  {
    id: "2",
    name: "Анна",
    email: "anna@example.com",
    activeSubscriptions: [
      {
        id: "sub3",
        title: "Standard Plan",
        description: "Access to standard features",
        price_per_3months: 19.99,
      },
    ],
    totalSubscriptions: 1,
  },
  {
    id: "3",
    name: "Олексій",
    email: "oleksiy@example.com",
    activeSubscriptions: [
      {
        id: "sub2",
        title: "Basic Plan",
        description: "Access to basic features",
        price_per_3months: 9.99,
      },
      {
        id: "sub4",
        title: "Pro Plan",
        description: "Access to premium features",
        price_per_3months: 39.99,
      },
    ],
    totalSubscriptions: 3,
  },
];

const mockTotalUsers = mockUsers.length;
// const mockTotalSubscriptions = mockUsers.reduce(
//   (sum, user) => sum + (user.totalSubscriptions || 0),
//   0
// );

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  //   const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  useEffect(() => {
    setUsers(mockUsers);
    setTotalUsers(mockTotalUsers);
    // setTotalSubscriptions(mockTotalSubscriptions);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white shadow-lg rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-700">
            Кількість користувачів
          </h2>
          <p className="text-3xl font-bold text-indigo-600">{totalUsers}</p>
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
                          <strong>{sub.title}</strong>
                          <p>{sub.description}</p>
                          <p className="text-sm text-gray-500">
                            Ціна: ${sub.price_per_3months}
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
