import { Subscription } from "./subscriptions";
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  activeSubscriptions?: Subscription[] | null;
  totalSubscriptions?: number | null;
  subscriptionPayments?: Subscription[] | null;
}
