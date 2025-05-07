// src/app/api/payment/monobank/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { SubscriptionPayment } from "@/entities/SubscriptionPayment";
import { Subscription } from "@/entities/Subscription";

// Конфігурація Monobank
const MONOBANK_API_URL = "https://api.monobank.ua/api/merchant/invoice/create";
const MONOBANK_TOKEN = process.env.MONOBANK_TOKEN || "";
const REDIRECT_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface MonobankInvoiceResponse {
  invoiceId: string;
  pageUrl: string;
}

async function convertCzkToEur(czkAmount: number): Promise<number> {
  try {
    // Use Frankfurter API for CZK to EUR conversion
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=CZK&to=EUR"
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    const czkToEurRate = data.rates.EUR;
    if (!czkToEurRate) {
      throw new Error("CZK to EUR rate not found in Frankfurter API");
    }

    return czkAmount * czkToEurRate;
  } catch (error) {
    console.error(
      "Error fetching CZK to EUR rate from Frankfurter API:",
      error
    );
    throw error;
  }
}

async function convertPlnToEur(plnAmount: number): Promise<number> {
  try {
    // Use Frankfurter API for PLN to EUR conversion
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=PLN&to=EUR"
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    const plnToEurRate = data.rates.EUR;
    if (!plnToEurRate) {
      throw new Error("PLN to EUR rate not found in Frankfurter API");
    }

    return plnAmount * plnToEurRate;
  } catch (error) {
    console.error(
      "Error fetching PLN to EUR rate from Frankfurter API:",
      error
    );
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ініціалізація підключення до БД
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const body = await request.json();
    const { subscriptionId, selectedPlan, locale, userId } = body;

    if (!subscriptionId || !selectedPlan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Отримання даних про підписку
    // Використовуємо сервіс або repository для отримання підписки за ID
    const subscriptionRepo = AppDataSource.getRepository(Subscription);
    const subscription = await subscriptionRepo.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Визначення ціни на основі плану та локалі
    let price: number = 0;
    let currencyCode: number = 980; // За замовчуванням UAH

    if (locale === "ua") {
      switch (selectedPlan) {
        case "1":
          price = Number(subscription.price_per_month_ua);
          break;
        case "3":
          price = Number(subscription.price_per_3months_ua);
          break;
        case "6":
          price = Number(subscription.price_per_6months_ua);
          break;
        case "12":
          price = Number(subscription.price_per_12months_ua);
          break;
      }
      currencyCode = 980;
    } else if (locale === "de") {
      switch (selectedPlan) {
        case "1":
          price = Number(subscription.price_per_month_eu);
          break;
        case "3":
          price = Number(subscription.price_per_3months_eu);
          break;
        case "6":
          price = Number(subscription.price_per_6months_eu);
          break;
        case "12":
          price = Number(subscription.price_per_12months_eu);
          break;
      }
      currencyCode = 978;
    } else if (locale === "cz") {
      switch (selectedPlan) {
        case "1":
          price = await convertCzkToEur(
            Number(subscription.price_per_month_cz)
          );
          break;
        case "3":
          price = await convertCzkToEur(
            Number(subscription.price_per_3months_cz)
          );
          break;
        case "6":
          price = await convertCzkToEur(
            Number(subscription.price_per_6months_cz)
          );
          break;
        case "12":
          price = await convertCzkToEur(
            Number(subscription.price_per_12months_cz)
          );
          break;
      }
      currencyCode = 978;
    } else if (locale === "pl") {
      switch (selectedPlan) {
        case "1":
          price = await convertPlnToEur(
            Number(subscription.price_per_month_pl)
          );
          break;
        case "3":
          price = await convertPlnToEur(
            Number(subscription.price_per_3months_pl)
          );
          break;
        case "6":
          price = await convertPlnToEur(
            Number(subscription.price_per_6months_pl)
          );
          break;
        case "12":
          price = await convertPlnToEur(
            Number(subscription.price_per_12months_pl)
          );
          break;
      }
      currencyCode = 978;
    } else {
      switch (selectedPlan) {
        case "1":
          price = Number(subscription.price_per_month);
          break;
        case "3":
          price = Number(subscription.price_per_3months);
          break;
        case "6":
          price = Number(subscription.price_per_6months);
          break;
        case "12":
          price = Number(subscription.price_per_12months);
          break;
      }
      currencyCode = 840;
    }

    const paymentRepo = AppDataSource.getRepository(SubscriptionPayment);
    const payment = new SubscriptionPayment();
    payment.status = "pending";
    payment.price = price;
    payment.locale = locale;
    payment.duration = selectedPlan;
    payment.startDate = new Date();
    payment.userId = userId || null;
    payment.subscriptionId = subscriptionId;
    await paymentRepo.save(payment);

    const amount = Math.round(price * 100);
    const title =
      locale === "ua"
        ? subscription.title_ua || subscription.title
        : locale === "de"
        ? subscription.title_de || subscription.title
        : locale === "cz"
        ? subscription.title_cs || subscription.title
        : locale === "pl"
        ? subscription.title_pl || subscription.title
        : subscription.title;

    const webhookCallbackUrl = `${REDIRECT_URL}/api/payment/monobank/webhook`;
    const redirectUrl = `${REDIRECT_URL}/${locale}/payment/success?paymentId=${payment.id}`;

    const monobankPayload = {
      amount,
      ccy: currencyCode,
      merchantPaymInfo: {
        reference: payment.id,
        destination:
          locale === "ua"
            ? `Оплата підписки: ${title} (${selectedPlan} міс.)`
            : locale === "de"
            ? `Abonnementzahlung: ${title} (${selectedPlan} Monate)`
            : locale === "cz"
            ? `Platba za předplatné: ${title} (${selectedPlan} měsíců)`
            : locale === "pl"
            ? `Płatność za subskrypcję: ${title} (${selectedPlan} miesięcy)`
            : `Subscription payment: ${title} (${selectedPlan} months)`,
        basketOrder: [
          {
            name: title,
            qty: 1,
            sum: amount,
            code: subscriptionId,
          },
        ],
      },
      redirectUrl,
      webHookUrl: webhookCallbackUrl,
      validity: 3600, // Час життя рахунку в секундах (1 година)
    };

    // Запит до Monobank API
    const response = await fetch(MONOBANK_API_URL, {
      method: "POST",
      headers: {
        "X-Token": MONOBANK_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monobankPayload),
    });

    const monobankResponse = (await response.json()) as MonobankInvoiceResponse;

    if (!response.ok) {
      console.error("Monobank API error:", monobankResponse);
      return NextResponse.json(
        { error: "Failed to create payment" },
        { status: 500 }
      );
    }

    // Оновлення запису про платіж з invoiceId від Monobank
    payment.status = "created";
    payment.invoiceId = monobankResponse.invoiceId;
    await paymentRepo.save(payment);

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      invoiceId: monobankResponse.invoiceId,
      pageUrl: monobankResponse.pageUrl,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating payment" },
      { status: 500 }
    );
  }
}
