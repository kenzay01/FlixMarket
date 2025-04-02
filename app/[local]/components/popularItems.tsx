"use client";

import PopularItem from "./popularItem";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import { useParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { useSubscriptions } from "@/context/hooks";
export default function PopularItems() {
  const { subscriptions, fetchSubscriptions } = useSubscriptions();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        await fetchSubscriptions();
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (subscriptions.length === 0) {
      loadSubscriptions();
    } else {
      setIsLoading(false);
    }
  }, [fetchSubscriptions, subscriptions.length]);
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua") || "en";
  const noSubscriptions = useClientTranslation("no_subscriptions");
  const title = useClientTranslation("popular_items");
  const loadingText = useClientTranslation("loading") || "Loading...";
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) =>
      subscription.regions?.includes(locale)
    );
  }, [subscriptions, locale]);
  let content;
  if (filteredSubscriptions.length === 0 && !isLoading) {
    content = (
      <section className="w-full my-16 flex items-center justify-center text-center">
        <p className="text-2xl">{noSubscriptions}</p>
      </section>
    );
  } else if (filteredSubscriptions.length > 0) {
    content = (
      <div>
        {filteredSubscriptions.map((item, index) => (
          <PopularItem key={index} item={item} index={index} />
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full h-screen flex items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-indigo-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-2xl text-white">{loadingText}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full max-w-5xl mx-auto p-6 pt-24 overflow-x-hidden">
      <h2 className="w-full text-center text-4xl font-bold mb-8">{title}</h2>
      {content}
    </section>
  );
}
