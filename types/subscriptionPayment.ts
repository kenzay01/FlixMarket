import { Subscription } from "./subscriptions";
import { User } from "./user";
export interface SubscriptionPayment {
  id: string;
  status: "active" | "completed" | "successful" | "pending" | "failed";
  startDate?: string;
  endDate?: string;
  date?: string;
  price: number;
  subscription: Subscription;
  user: User;
  locale: "en" | "de" | "ua";
}
