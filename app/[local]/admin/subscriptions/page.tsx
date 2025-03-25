"use client";

import { useState } from "react";
import { Subscription } from "../../../../types/subscriptions";
import { Eye, EyeOff } from "lucide-react";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      title: "Базовий план",
      title_de: "Basis-Plan",
      title_ua: "Базовий план",
      imageUrl: "",
      benefitsList: ["Перевага 1", "Перевага 2"],
      benefitsList_de: ["Funktion 1", "Funktion 2"],
      benefitsList_ua: ["Перевага 1", "Перевага 2"],
      description: "Базовий план підписки",
      description_de: "Basis-Abonnementplan",
      description_ua: "Базовий план підписки",
      price_per_month: 9.99,
      price_per_month_eu: 8.99,
      price_per_month_ua: 250,
      price_per_3months: 29.99,
      price_per_3months_eu: 27.99,
      price_per_3months_ua: 750,
      price_per_6months: 54.99,
      price_per_6months_eu: 51.99,
      price_per_6months_ua: 1499,
      price_per_12months: 99.99,
      price_per_12months_eu: 94.99,
      price_per_12months_ua: 2999,
    },
  ]);

  const [currentSubscription, setCurrentSubscription] = useState<
    Partial<Subscription>
  >({});
  const [isEditing, setIsEditing] = useState(false);

  const [newBenefit, setNewBenefit] = useState("");
  const [newBenefit_de, setNewBenefit_de] = useState("");
  const [newBenefit_ua, setNewBenefit_ua] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentSubscription((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : value,
    }));
  };

  const handleAddBenefit = (lang: "en" | "de" | "ua") => {
    const benefit =
      lang === "en"
        ? newBenefit
        : lang === "de"
        ? newBenefit_de
        : newBenefit_ua;
    const key =
      lang === "en"
        ? "benefitsList"
        : lang === "de"
        ? "benefitsList_de"
        : "benefitsList_ua";

    if (benefit.trim()) {
      setCurrentSubscription((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), benefit.trim()],
      }));

      if (lang === "en") {
        setNewBenefit("");
      } else if (lang === "de") {
        setNewBenefit_de("");
      } else {
        setNewBenefit_ua("");
      }
    }
  };

  const handleRemoveBenefit = (lang: "en" | "de" | "ua", index: number) => {
    const key =
      lang === "en"
        ? "benefitsList"
        : lang === "de"
        ? "benefitsList_de"
        : "benefitsList_ua";
    setCurrentSubscription((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddOrUpdateSubscription = () => {
    const processedSubscription = {
      ...currentSubscription,
      price_per_month: currentSubscription.price_per_month ?? 0,
      price_per_month_eu: currentSubscription.price_per_month_eu ?? 0,
      price_per_month_ua: currentSubscription.price_per_month_ua ?? 0,
      price_per_3months: currentSubscription.price_per_3months ?? 0,
      price_per_3months_eu: currentSubscription.price_per_3months_eu ?? 0,
      price_per_3months_ua: currentSubscription.price_per_3months_ua ?? 0,
      price_per_6months: currentSubscription.price_per_6months ?? 0,
      price_per_6months_eu: currentSubscription.price_per_6months_eu ?? 0,
      price_per_6months_ua: currentSubscription.price_per_6months_ua ?? 0,
      price_per_12months: currentSubscription.price_per_12months ?? 0,
      price_per_12months_eu: currentSubscription.price_per_12months_eu ?? 0,
      price_per_12months_ua: currentSubscription.price_per_12months_ua ?? 0,
    };

    if (isEditing) {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === currentSubscription.id
            ? { ...sub, ...processedSubscription }
            : sub
        )
      );
    } else {
      const newSubscription: Subscription = {
        ...processedSubscription,
        id: String(subscriptions.length + 1),
      } as Subscription;
      setSubscriptions((prev) => [...prev, newSubscription]);
    }

    // Скидання форми
    setCurrentSubscription({});
    setIsEditing(false);
  };

  const handleEdit = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setIsEditing(true);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<
    string | null
  >(null);

  const handleDeleteClick = (id: string) => {
    setSubscriptionToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (subscriptionToDelete) {
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscriptionToDelete)
      );
      setSubscriptionToDelete(null);
      setModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSubscriptionToDelete(null);
    setModalOpen(false);
  };

  const handleClearForm = () => {
    setCurrentSubscription({});
    setIsEditing(false);
  };

  const handleTogglePriceVisibility = (
    name: keyof Subscription,
    currentValue: string | number | string[] | null | undefined
  ) => {
    setCurrentSubscription((prev) => ({
      ...prev,
      [name]:
        Number(currentValue) === 0 || currentValue === undefined
          ? prev[name]
          : 0,
    }));
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Управління підписками</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-h-[1000px] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Існуючі підписки</h2>
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="mb-4 p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 flex justify-between items-center">
                <span>
                  {subscription.title} / {subscription.title_de} /{" "}
                  {subscription.title_ua}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDeleteClick(subscription.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    Видалити
                  </button>
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    Редагувати
                  </button>
                </div>
              </h3>

              <hr className="my-3 border-gray-300" />

              <div className="mb-3">
                <h4 className="text-gray-700 font-semibold">Опис:</h4>
                <p className="text-gray-600">
                  Англ. {subscription.description}
                </p>
                <p className="text-gray-600">
                  Нім. {subscription.description_de}
                </p>
                <p className="text-gray-600">
                  Укр. {subscription.description_ua}
                </p>
              </div>

              <div className="mb-3">
                <h4 className="text-gray-700 font-semibold">Переваги:</h4>
                <ul className="space-y-2">
                  {subscription.benefitsList?.map((benefit, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-lg">
                      <div className="text-gray-800">Англ. {benefit}</div>
                      <div className="text-gray-600">
                        Нім. {subscription.benefitsList_de?.[index]}
                      </div>
                      <div className="text-gray-600">
                        Укр. {subscription.benefitsList_ua?.[index]}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
                {[
                  {
                    label: "1 місяць",
                    price: subscription.price_per_month,
                    priceEu: subscription.price_per_month_eu,
                    priceUa: subscription.price_per_month_ua,
                  },
                  {
                    label: "3 місяці",
                    price: subscription.price_per_3months,
                    priceEu: subscription.price_per_3months_eu,
                    priceUa: subscription.price_per_3months_ua,
                  },
                  {
                    label: "6 місяців",
                    price: subscription.price_per_6months,
                    priceEu: subscription.price_per_6months_eu,
                    priceUa: subscription.price_per_6months_ua,
                  },
                  {
                    label: "12 місяців",
                    price: subscription.price_per_12months,
                    priceEu: subscription.price_per_12months_eu,
                    priceUa: subscription.price_per_12months_ua,
                  },
                ]
                  .filter((term) => term.price != null && term.price > 0)
                  .map((term, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <span className="font-semibold">{term.label}:</span>
                      <div>
                        ${term.price} / €{term.priceEu} / ₴{term.priceUa}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {isEditing ? "Редагування підписки" : "Додати нову підписку"}
            </h2>
            <button
              onClick={handleClearForm}
              className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-lg transition-all cursor-pointer"
            >
              Очистити
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block mb-1">Назва (Англійська)</label>
              <input
                type="text"
                name="title"
                placeholder="Назва (Англійська)"
                value={currentSubscription.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Назва (Німецька)</label>
              <input
                type="text"
                name="title_de"
                placeholder="Назва (Німецька)"
                value={currentSubscription.title_de || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Назва (Українська)</label>
              <input
                type="text"
                name="title_ua"
                placeholder="Назва (Українська)"
                value={currentSubscription.title_ua || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Опис (Англійська)</label>
              <textarea
                name="description"
                placeholder="Опис (Англійська)"
                value={currentSubscription.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Опис (Німецька)</label>
              <textarea
                name="description_de"
                placeholder="Опис (Німецька)"
                value={currentSubscription.description_de || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Опис (Українська)</label>
              <textarea
                name="description_ua"
                placeholder="Опис (Українська)"
                value={currentSubscription.description_ua || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Бенефіти (Англійська)</h3>
              {currentSubscription.benefitsList?.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{benefit}</span>
                  <button
                    onClick={() => handleRemoveBenefit("en", index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
                  >
                    Видалити
                  </button>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Додати бенефіт (Англійська)"
                  className="flex-grow p-2 border rounded mr-2"
                />
                <button
                  onClick={() => handleAddBenefit("en")}
                  className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Бенефіти (Німецька)</h3>
              {currentSubscription.benefitsList_de?.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{benefit}</span>
                  <button
                    onClick={() => handleRemoveBenefit("de", index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
                  >
                    Видалити
                  </button>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  value={newBenefit_de}
                  onChange={(e) => setNewBenefit_de(e.target.value)}
                  placeholder="Додати бенефіт (Німецька)"
                  className="flex-grow p-2 border rounded mr-2"
                />
                <button
                  onClick={() => handleAddBenefit("de")}
                  className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Бенефіти (Українська)</h3>
              {currentSubscription.benefitsList_ua?.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{benefit}</span>
                  <button
                    onClick={() => handleRemoveBenefit("ua", index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
                  >
                    Видалити
                  </button>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  value={newBenefit_ua}
                  onChange={(e) => setNewBenefit_ua(e.target.value)}
                  placeholder="Додати бенефіт (Українська)"
                  className="flex-grow p-2 border rounded mr-2"
                />
                <button
                  onClick={() => handleAddBenefit("ua")}
                  className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Ціна за 1 місяць (USD)",
                  name: "price_per_month" as keyof Subscription,
                },
                {
                  label: "Ціна за 1 місяць (EU)",
                  name: "price_per_month_eu" as keyof Subscription,
                },
                {
                  label: "Ціна за 1 місяць (UAH)",
                  name: "price_per_month_ua" as keyof Subscription,
                },
                {
                  label: "Ціна за 3 місяці (USD)",
                  name: "price_per_3months" as keyof Subscription,
                },
                {
                  label: "Ціна за 3 місяці (EU)",
                  name: "price_per_3months_eu" as keyof Subscription,
                },
                {
                  label: "Ціна за 3 місяці (UAH)",
                  name: "price_per_3months_ua" as keyof Subscription,
                },
                {
                  label: "Ціна за 6 місяців (USD)",
                  name: "price_per_6months" as keyof Subscription,
                },
                {
                  label: "Ціна за 6 місяців (EU)",
                  name: "price_per_6months_eu" as keyof Subscription,
                },
                {
                  label: "Ціна за 6 місяців (UAH)",
                  name: "price_per_6months_ua" as keyof Subscription,
                },
                {
                  label: "Ціна за 12 місяців (USD)",
                  name: "price_per_12months" as keyof Subscription,
                },
                {
                  label: "Ціна за 12 місяців (EU)",
                  name: "price_per_12months_eu" as keyof Subscription,
                },
                {
                  label: "Ціна за 12 місяців (UAH)",
                  name: "price_per_12months_ua" as keyof Subscription,
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block mb-1">{field.label}</label>
                  <div className="flex items-center">
                    <span className="mr-2">
                      {field.name.includes("_eu")
                        ? "€"
                        : field.name.includes("_ua")
                        ? "₴"
                        : "$"}
                    </span>
                    <input
                      type="number"
                      name={field.name}
                      step="0.01"
                      min="0"
                      value={currentSubscription[field.name] || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        currentSubscription[field.name] === 0 ||
                        currentSubscription[field.name] === undefined
                          ? "bg-gray-100 text-gray-500"
                          : "bg-white text-black"
                      }`}
                      placeholder="0.00"
                    />
                    <button
                      onClick={() =>
                        handleTogglePriceVisibility(
                          field.name,
                          currentSubscription[field.name]
                        )
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      title={
                        currentSubscription[field.name] === 0 ||
                        currentSubscription[field.name] === undefined
                          ? "Активувати термін"
                          : "Деактивувати термін"
                      }
                    >
                      {currentSubscription[field.name] === 0 ||
                      currentSubscription[field.name] === undefined ? (
                        <EyeOff className="w-5 h-5 text-red-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-green-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddOrUpdateSubscription}
              className="w-full bg-green-500 text-white p-2 rounded mt-4 cursor-pointer"
            >
              {isEditing ? "Оновити підписку" : "Додати підписку"}
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Ви впевнені?</h3>
            <p className="text-gray-600 mb-4">Цю дію не можна скасувати.</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
              >
                Скасувати
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
