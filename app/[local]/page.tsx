"use client";
import HomeBanner from "./components/homeBanner";
import PopularItems from "./components/popularItems";
import HowItWorks from "./components/howItWorks";
import ReviewsContainer from "./components/reviewsContainer";
import {
  useUsers,
  useSubscriptions,
  useSubscriptionPayments,
} from "@/context/hooks";
import { useEffect } from "react";
export default function Home() {
  const { users, fetchUsers } = useUsers();
  const { subscriptions } = useSubscriptions();
  const { subscriptionPayments } = useSubscriptionPayments();
  console.log("Users:", users);
  console.log("Subscriptions:", subscriptions);
  console.log("Subscription Payments:", subscriptionPayments);
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-full w-full">
      <HomeBanner />
      <PopularItems />
      <HowItWorks />
      <ReviewsContainer />
    </div>
  );
}
