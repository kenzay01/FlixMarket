// import { Subscription } from "./subscriptions";
export interface SubscriptionPayment {
  id: string;
  status: "active" | "completed" | "successful" | "pending" | "failed";
  userId: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  price: number;
  // subscription: Subscription;
  subscriptionId: string;
  locale: "en" | "de" | "ua" | "cz";
}
