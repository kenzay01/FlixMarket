"use client";

import { useState, useEffect, useRef } from "react";
import { Subscription } from "../../../../../types/subscriptions";
import { Eye, EyeOff, Upload, X, Image as ImageIcon } from "lucide-react";
// interface EditableSubscription extends Partial<Subscription> {
//   imageFile?: File | null;
// }

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<
    Partial<Subscription>
  >({});
  const [isEditing, setIsEditing] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const [newBenefit_de, setNewBenefit_de] = useState("");
  const [newBenefit_ua, setNewBenefit_ua] = useState("");
  const [newBenefit_cs, setNewBenefit_cs] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/subscriptions");
      if (!response.ok) {
        throw new Error(`Error fetching subscriptions: ${response.statusText}`);
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Failed to fetch subscriptions:", err);
    }
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) {
        setCurrentSubscription((currentSub) => {
          const updatedSub = { ...currentSub };
          if (region === "en") {
            updatedSub.title = "";
            updatedSub.description = "";
            updatedSub.benefitsList = [];
            updatedSub.price_per_month = 0;
            updatedSub.price_per_3months = 0;
            updatedSub.price_per_6months = 0;
            updatedSub.price_per_12months = 0;
          } else if (region === "de") {
            updatedSub.title_de = "";
            updatedSub.description_de = "";
            updatedSub.benefitsList_de = [];
            updatedSub.price_per_month_eu = 0;
            updatedSub.price_per_3months_eu = 0;
            updatedSub.price_per_6months_eu = 0;
            updatedSub.price_per_12months_eu = 0;
          } else if (region === "ua") {
            updatedSub.title_ua = "";
            updatedSub.description_ua = "";
            updatedSub.benefitsList_ua = [];
            updatedSub.price_per_month_ua = 0;
            updatedSub.price_per_3months_ua = 0;
            updatedSub.price_per_6months_ua = 0;
            updatedSub.price_per_12months_ua = 0;
          } else if (region === "cz") {
            updatedSub.title_cs = "";
            updatedSub.description_cs = "";
            updatedSub.benefitsList_cs = [];
            updatedSub.price_per_month_cz = 0;
            updatedSub.price_per_3months_cz = 0;
            updatedSub.price_per_6months_cz = 0;
            updatedSub.price_per_12months_cz = 0;
          }
          return updatedSub;
        });
        return prev.filter((r) => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "imageFile") return;

    setCurrentSubscription((prev) => {
      const isPriceField = name.includes("price_");
      return {
        ...prev,
        [name]: isPriceField ? (value === "" ? 0 : Number(value)) : value,
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCurrentSubscription((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCurrentSubscription((prev) => {
      const updated = { ...prev };
      updated.imageFile = null;
      updated.imageUrl = "";
      return updated;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddBenefit = (lang: "en" | "de" | "ua" | "cz") => {
    const benefit =
      lang === "en"
        ? newBenefit
        : lang === "de"
        ? newBenefit_de
        : lang === "ua"
        ? newBenefit_ua
        : newBenefit_cs;
    const key =
      lang === "en"
        ? "benefitsList"
        : lang === "de"
        ? "benefitsList_de"
        : lang === "ua"
        ? "benefitsList_ua"
        : "benefitsList_cs";

    if (benefit.trim()) {
      setCurrentSubscription((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), benefit.trim()],
      }));

      if (lang === "en") {
        setNewBenefit("");
      } else if (lang === "de") {
        setNewBenefit_de("");
      } else if (lang === "ua") {
        setNewBenefit_ua("");
      } else if (lang === "cz") {
        setNewBenefit_cs("");
      }
    }
  };

  const handleRemoveBenefit = (
    lang: "en" | "de" | "ua" | "cz",
    index: number
  ) => {
    const key =
      lang === "en"
        ? "benefitsList"
        : lang === "de"
        ? "benefitsList_de"
        : lang === "ua"
        ? "benefitsList_ua"
        : "benefitsList_cs";
    setCurrentSubscription((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddOrUpdateSubscription = async () => {
    try {
      let imageUrl = currentSubscription.imageUrl || "";

      if (currentSubscription.imageFile instanceof File) {
        const formData = new FormData();
        formData.append("image", currentSubscription.imageFile);

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(
            `Помилка завантаження зображення: ${uploadResponse.statusText}`
          );
        }
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          imageUrl = uploadData.imageUrl;
        } else {
          throw new Error("Не вдалося завантажити зображення");
        }
      }
      const { ...subscriptionData } = currentSubscription;

      const processedSubscription = {
        ...subscriptionData,
        imageUrl,
        regions: selectedRegions.length > 0 ? selectedRegions : ["en"],
        price_per_month: subscriptionData.price_per_month ?? 0,
        price_per_month_eu: subscriptionData.price_per_month_eu ?? 0,
        price_per_month_ua: subscriptionData.price_per_month_ua ?? 0,
        price_per_month_cz: subscriptionData.price_per_month_cz ?? 0,
        price_per_3months: subscriptionData.price_per_3months ?? 0,
        price_per_3months_eu: subscriptionData.price_per_3months_eu ?? 0,
        price_per_3months_ua: subscriptionData.price_per_3months_ua ?? 0,
        price_per_3months_cz: subscriptionData.price_per_3months_cz ?? 0,
        price_per_6months: subscriptionData.price_per_6months ?? 0,
        price_per_6months_eu: subscriptionData.price_per_6months_eu ?? 0,
        price_per_6months_ua: subscriptionData.price_per_6months_ua ?? 0,
        price_per_6months_cz: subscriptionData.price_per_6months_cz ?? 0,
        price_per_12months: subscriptionData.price_per_12months ?? 0,
        price_per_12months_eu: subscriptionData.price_per_12months_eu ?? 0,
        price_per_12months_ua: subscriptionData.price_per_12months_ua ?? 0,
        price_per_12months_cz: subscriptionData.price_per_12months_cz ?? 0,
      };

      let response;

      if (isEditing) {
        response = await fetch("/api/subscriptions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(processedSubscription),
        });
      } else {
        response = await fetch("/api/subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(processedSubscription),
        });
      }

      if (!response.ok) {
        throw new Error(
          `Error ${isEditing ? "updating" : "creating"} subscription: ${
            response.statusText
          }`
        );
      }

      await fetchSubscriptions();
      handleClearForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(
        `Failed to ${isEditing ? "update" : "create"} subscription:`,
        err
      );
    }
  };

  const handleEdit = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setSelectedRegions(subscription.regions || ["en"]);
    setIsEditing(true);
    if (subscription.imageUrl) {
      setImagePreview(subscription.imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<
    string | null
  >(null);

  const handleDeleteClick = (id: string) => {
    setSubscriptionToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (subscriptionToDelete) {
      try {
        const subscriptionToRemove = subscriptions.find(
          (sub) => sub.id === subscriptionToDelete
        );
        const response = await fetch(
          `/api/subscriptions?id=${subscriptionToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error deleting subscription: ${response.statusText}`
          );
        }
        if (subscriptionToRemove?.imageUrl) {
          const imageDeleteResponse = await fetch(
            `/api/delete-image?imageUrl=${encodeURIComponent(
              subscriptionToRemove.imageUrl
            )}`,
            {
              method: "DELETE",
            }
          );

          if (!imageDeleteResponse.ok) {
            console.error(
              "Failed to delete image file, but subscription was removed"
            );
          }
        }

        setSubscriptions((prev) =>
          prev.filter((sub) => sub.id !== subscriptionToDelete)
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Failed to delete subscription:", err);
      } finally {
        setSubscriptionToDelete(null);
        setModalOpen(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setSubscriptionToDelete(null);
    setModalOpen(false);
  };

  const handleClearForm = () => {
    setCurrentSubscription({});
    setIsEditing(false);
    setSelectedRegions([]);
    setImagePreview(null);
    setNewBenefit("");
    setNewBenefit_de("");
    setNewBenefit_ua("");
    setNewBenefit_cs("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTogglePriceVisibility = (
    name: keyof Subscription,
    currentValue:
      | string
      | number
      | string[]
      | null
      | undefined
      | File
      | File[]
      | readonly string[]
  ) => {
    setCurrentSubscription((prev) => ({
      ...prev,
      [name]:
        Number(currentValue) === 0 || currentValue === undefined
          ? prev[name]
          : 0,
    }));
  };

  const isEn = selectedRegions.includes("en");
  const isDe = selectedRegions.includes("de");
  const isUa = selectedRegions.includes("ua");
  const isCz = selectedRegions.includes("cz");

  // const getLocalizedText = () => {
  //   return {
  //     title: "Управління підписками",
  //     existingSubscriptions: "Існуючі підписки",
  //     editOrAdd: isEditing ? "Редагування підписки" : "Додати нову підписку",
  //     clear: "Очистити",
  //     subscriptionImage: "Зображення підписки",
  //     uploadImage: "Завантажити зображення",
  //     selectRegions: "Виберіть регіони",
  //     description: "Опис",
  //     benefits: "Переваги",
  //     addBenefit: "Додати бенефіт",
  //     remove: "Видалити",
  //     edit: "Редагувати",
  //     delete: "Видалити",
  //     confirmDelete: "Ви впевнені?",
  //     confirmDeleteMessage: "Цю дію не можна скасувати.",
  //     cancel: "Скасувати",
  //     confirm: "Видалити",
  //     updateSubscription: "Оновити підписку",
  //     addSubscription: "Додати підписку",
  //     selectedRegions: "Вибрані регіони",
  //     month: "місяць",
  //     error: "Помилка",
  //     titleEn: "Назва (Англійська)",
  //     titleDe: "Назва (Німецька)",
  //     titleUa: "Назва (Українська)",
  //     titleCz: "Назва (Чеська)",
  //     descEn: "Опис (Англійська)",
  //     descDe: "Опис (Німецька)",
  //     descUa: "Опис (Українська)",
  //     descCz: "Опис (Чеська)",
  //     benefitEn: "Додати бенефіт (Англійська)",
  //     benefitDe: "Додати бенефіт (Німецька)",
  //     benefitUa: "Додати бенефіт (Українська)",
  //     benefitCz: "Додати бенефіт (Чеська)",
  //   };
  // };

  // const text = getLocalizedText();

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

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
                  {subscription.title}{" "}
                  {subscription.regions?.includes("de") &&
                  subscription.regions?.includes("en")
                    ? "/"
                    : ""}{" "}
                  {subscription.title_de}{" "}
                  {subscription.regions?.includes("ua") &&
                  (subscription.regions?.includes("en") ||
                    subscription.regions?.includes("de"))
                    ? "/"
                    : ""}{" "}
                  {subscription.title_ua}{" "}
                  {subscription.regions?.includes("cz") &&
                  (subscription.regions?.includes("en") ||
                    subscription.regions?.includes("de") ||
                    subscription.regions?.includes("ua"))
                    ? "/"
                    : ""}{" "}
                  {subscription.title_cs}
                </span>
                <div className="flex space-x-2">
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

              {subscription.imageUrl && (
                <div className="my-3">
                  <img
                    src={subscription.imageUrl}
                    alt={subscription.title || "Subscription image"}
                    className="w-full max-h-56 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="m-3">
                <h4>Вибрані регіони:</h4>
                <ul className="flex gap-1">
                  {subscription.regions?.map((region, index) => (
                    <li
                      key={index}
                      className="text-gray-600 px-2 bg-gray-100 rounded-lg"
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-3 border-gray-300" />

              <div className="mb-3">
                <h4 className="text-gray-700 font-semibold">Опис:</h4>
                {subscription.regions?.includes("en") && (
                  <p className="text-gray-600 whitespace-pre-line">
                    Англ. {subscription.description}
                  </p>
                )}
                {subscription.regions?.includes("de") && (
                  <p className="text-gray-600 whitespace-pre-line">
                    Нім. {subscription.description_de}
                  </p>
                )}
                {subscription.regions?.includes("ua") && (
                  <p className="text-gray-600 whitespace-pre-line">
                    Укр. {subscription.description_ua}
                  </p>
                )}
                {subscription.regions?.includes("cz") && (
                  <p className="text-gray-600 whitespace-pre-line">
                    Чех. {subscription.description_cs}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <h4 className="text-gray-700 font-semibold">Переваги:</h4>
                <ul className="space-y-2">
                  {subscription.benefitsList?.map((benefit, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-lg">
                      {subscription.regions?.includes("en") && (
                        <div className="text-gray-800">Англ. {benefit}</div>
                      )}
                    </li>
                  ))}
                  {subscription.benefitsList_de?.map((benefit, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-lg">
                      {subscription.regions?.includes("de") && (
                        <div className="text-gray-800">Нім. {benefit}</div>
                      )}
                    </li>
                  ))}
                  {subscription.benefitsList_ua?.map((benefit, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-lg">
                      {subscription.regions?.includes("ua") && (
                        <div className="text-gray-800">Укр. {benefit}</div>
                      )}
                    </li>
                  ))}
                  {subscription.benefitsList_cs?.map((benefit, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-lg">
                      {subscription.regions?.includes("cz") && (
                        <div className="text-gray-800">Чех. {benefit}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-800">
                {[
                  {
                    label: "1 місяць",
                    price: subscription.price_per_month,
                    priceEu: subscription.price_per_month_eu,
                    priceUa: subscription.price_per_month_ua,
                    priceCz: subscription.price_per_month_cz,
                  },
                  {
                    label: "3 місяці",
                    price: subscription.price_per_3months,
                    priceEu: subscription.price_per_3months_eu,
                    priceUa: subscription.price_per_3months_ua,
                    priceCz: subscription.price_per_3months_cz,
                  },
                  {
                    label: "6 місяців",
                    price: subscription.price_per_6months,
                    priceEu: subscription.price_per_6months_eu,
                    priceUa: subscription.price_per_6months_ua,
                    priceCz: subscription.price_per_6months_cz,
                  },
                  {
                    label: "12 місяців",
                    price: subscription.price_per_12months,
                    priceEu: subscription.price_per_12months_eu,
                    priceUa: subscription.price_per_12months_ua,
                    priceCz: subscription.price_per_12months_cz,
                  },
                ]
                  .filter(
                    (term) =>
                      (term.price != null && term.price > 0) ||
                      (term.priceEu != null && term.priceEu > 0) ||
                      (term.priceUa != null && term.priceUa > 0) ||
                      (term.priceCz != null && term.priceCz > 0)
                  )
                  .map((term, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <span className="font-semibold">{term.label}:</span>
                      <div>
                        {subscription.regions?.includes("en") &&
                          term.price !== 0 &&
                          `$${term.price}`}{" "}
                        {subscription.regions?.includes("en") &&
                        (subscription.regions?.includes("de") ||
                          subscription.regions?.includes("ua") ||
                          subscription.regions?.includes("cz")) &&
                        term.price !== 0
                          ? "/ "
                          : ""}
                        {subscription.regions?.includes("de") &&
                          term.priceEu !== 0 &&
                          `€${term.priceEu}`}{" "}
                        {subscription.regions?.includes("de") &&
                        (subscription.regions?.includes("ua") ||
                          subscription.regions?.includes("cz")) &&
                        term.priceEu !== 0
                          ? "/ "
                          : ""}
                        {subscription.regions?.includes("ua") &&
                          term.priceUa !== 0 &&
                          `₴${term.priceUa}`}{" "}
                        {subscription.regions?.includes("ua") &&
                        subscription.regions?.includes("cz") &&
                        term.priceUa !== 0
                          ? "/ "
                          : ""}
                        {subscription.regions?.includes("cz") &&
                          term.priceCz !== 0 &&
                          `Kč ${term.priceCz}`}
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

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Зображення підписки</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-48 object-contain mx-auto"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-32 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-center">
                    Натисніть, щоб завантажити зображення підписки
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {!imagePreview && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Завантажити зображення
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Виберіть регіони</h3>
            <div className="flex space-x-2">
              {["en", "de", "ua", "cz"].map((region) => (
                <button
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    selectedRegions.includes(region)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {region.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {isEn && (
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
            )}
            {isDe && (
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
            )}
            {isUa && (
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
            )}
            {isCz && (
              <div>
                <label className="block mb-1">Назва (Чеська)</label>
                <input
                  type="text"
                  name="title_cs"
                  placeholder="Назва (Чеська)"
                  value={currentSubscription.title_cs || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            {isEn && (
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
            )}
            {isDe && (
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
            )}
            {isUa && (
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
            )}
            {isCz && (
              <div>
                <label className="block mb-1">Опис (Чеська)</label>
                <textarea
                  name="description_cs"
                  placeholder="Опис (Чеська)"
                  value={currentSubscription.description_cs || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            {isEn && (
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
            )}

            {isDe && (
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
            )}

            {isUa && (
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
            )}

            {isCz && (
              <div>
                <h3 className="font-semibold mb-2">Бенефіти (Чеська)</h3>
                {currentSubscription.benefitsList_cs?.map((benefit, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">{benefit}</span>
                    <button
                      onClick={() => handleRemoveBenefit("cz", index)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
                    >
                      Видалити
                    </button>
                  </div>
                ))}
                <div className="flex">
                  <input
                    type="text"
                    value={newBenefit_cs}
                    onChange={(e) => setNewBenefit_cs(e.target.value)}
                    placeholder="Додати бенефіт (Чеська)"
                    className="flex-grow p-2 border rounded mr-2"
                  />
                  <button
                    onClick={() => handleAddBenefit("cz")}
                    className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  region: "en",
                  label: " 1 місяць (USD)",
                  name: "price_per_month" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "en",
                  label: " 3 місяці (USD)",
                  name: "price_per_3months" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "en",
                  label: " 6 місяців (USD)",
                  name: "price_per_6months" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "en",
                  label: " 12 місяців (USD)",
                  name: "price_per_12months" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "de",
                  label: `1 місяць (EU)`,
                  name: "price_per_month_eu" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "de",
                  label: " 3 місяці (EU)",
                  name: "price_per_3months_eu" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "de",
                  label: `6 місяців (EUR)`,
                  name: "price_per_6months_eu" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "de",
                  label: `12 місяців (EUR)`,
                  name: "price_per_12months_eu" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "ua",
                  label: `1 місяць (UAH)`,
                  name: "price_per_month_ua" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "ua",
                  label: `3 місяці(UAH)`,
                  name: "price_per_3months_ua" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "ua",
                  label: `6 місяців (UAH)`,
                  name: "price_per_6months_ua" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "ua",
                  label: `12 місяців (UAH)`,
                  name: "price_per_12months_ua" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "cz",
                  label: `1 місяць (Kč)`,
                  name: "price_per_month_cz" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "cz",
                  label: `3 місяці (Kč)`,
                  name: "price_per_3months_cz" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "cz",
                  label: `6 місяців (Kč)`,
                  name: "price_per_6months_cz" as keyof Subscription,
                  type: "number",
                },
                {
                  region: "cz",
                  label: `12 місяців (Kč)`,
                  name: "price_per_12months_cz" as keyof Subscription,
                  type: "number",
                },
              ]
                .filter((field) => {
                  const region = field.region;
                  return (
                    (region === "en" && isEn) ||
                    (region === "de" && isDe) ||
                    (region === "ua" && isUa) ||
                    (region === "cz" && isCz)
                  );
                })
                .map((field) => (
                  <div key={field.name} className="relative">
                    <label className="block mb-1">{field.label}</label>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {field.name.includes("_eu")
                          ? "€"
                          : field.name.includes("_ua")
                          ? "₴"
                          : field.name.includes("_cz")
                          ? "Kč "
                          : "$"}
                      </span>
                      <input
                        type="number"
                        name={field.name}
                        step="0.01"
                        min="0"
                        value={
                          (currentSubscription[
                            field.name
                          ] as readonly string[]) || ""
                        }
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
                        className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
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
