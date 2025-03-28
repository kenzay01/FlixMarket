import { Subscription } from "./subscriptions";
export interface SubscriptionPayment {
  id: string;
  status: "active" | "completed" | "successful" | "pending" | "failed";
  startDate?: string;
  endDate?: string;
  date?: string;
  price: number;
  subscription: Subscription;
  locale: "en" | "de" | "ua";
}
