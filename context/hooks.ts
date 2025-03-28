import { useAppContext } from "./AppContext";

export const useUsers = () => {
  const { users, fetchUsers } = useAppContext();
  return { users, fetchUsers };
};

export const useSubscriptions = () => {
  const { subscriptions, fetchSubscriptions } = useAppContext();
  return { subscriptions, fetchSubscriptions };
};

export const useSubscriptionPayments = () => {
  const { subscriptionPayments, fetchSubscriptionPayments } = useAppContext();
  return { subscriptionPayments, fetchSubscriptionPayments };
};
