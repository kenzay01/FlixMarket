"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/entities/User";
import { Subscription } from "@/entities/Subscription";
import { SubscriptionPayment } from "@/entities/SubscriptionPayment";

interface AppContextType {
  users: User[];
  subscriptions: Subscription[];
  subscriptionPayments: SubscriptionPayment[];
  fetchUsers: () => Promise<void>;
  fetchSubscriptions: () => Promise<void>;
  fetchSubscriptionPayments: () => Promise<void>;
  isLoading: boolean;
  isDbInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionPayments, setSubscriptionPayments] = useState<
    SubscriptionPayment[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDbInitialized, setIsDbInitialized] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Функція для отримання підписок через API
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/subscriptions");
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  // Функція для отримання платежів через API
  const fetchSubscriptionPayments = async () => {
    try {
      const response = await fetch("/api/subscriptionPayments");
      const data = await response.json();
      setSubscriptionPayments(data);
    } catch (error) {
      console.error("Error fetching subscription payments:", error);
    }
  };

  // Ініціалізація бази даних при монтуванні
  useEffect(() => {
    const initDb = async () => {
      try {
        const response = await fetch("/api/initDb");
        const data = await response.json();
        if (data.success) {
          setIsDbInitialized(true);
          await Promise.all([
            fetchUsers(),
            fetchSubscriptions(),
            fetchSubscriptionPayments(),
          ]);
        } else {
          console.error("Database initialization API failed:", data.error);
        }
      } catch (error) {
        console.error("Database initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initDb();
  }, []);

  const contextValue: AppContextType = {
    users,
    subscriptions,
    subscriptionPayments,
    fetchUsers,
    fetchSubscriptions,
    fetchSubscriptionPayments,
    isLoading,
    isDbInitialized,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
