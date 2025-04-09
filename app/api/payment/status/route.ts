// src/app/api/payment/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { SubscriptionPayment } from "@/entities/SubscriptionPayment";
import { Subscription } from "@/entities/Subscription";

// Конфігурація Monobank
const MONOBANK_API_URL = "https://api.monobank.ua/api/merchant/invoice/status";
const MONOBANK_TOKEN = process.env.MONOBANK_TOKEN || "";

export async function GET(request: NextRequest) {
  try {
    // Ініціалізація підключення до БД
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    const paymentRepo = AppDataSource.getRepository(SubscriptionPayment);
    const payment = await paymentRepo.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Отримуємо інформацію про підписку
    const subscriptionRepo = AppDataSource.getRepository(Subscription);
    const subscription = await subscriptionRepo.findOne({
      where: { id: payment.subscriptionId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Отримуємо актуальний статус від Monobank
    const invoiceId = payment.invoiceId;

    if (!invoiceId) {
      return NextResponse.json(
        {
          error: "Monobank invoice ID not found for this payment",
        },
        { status: 400 }
      );
    }
    const response = await fetch(`${MONOBANK_API_URL}?invoiceId=${invoiceId}`, {
      method: "GET",
      headers: {
        "X-Token": MONOBANK_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Monobank API error:", await response.text());
      // Повертаємо останній відомий статус з бази даних
      return NextResponse.json({
        id: payment.id,
        status: payment.status,
        startDate: payment.startDate,
        endDate: payment.endDate,
        duration: payment.duration,
        price: payment.price,
        monobankStatusFetch: "failed",
        subscription: {
          id: subscription.id,
          title: subscription.title,
          title_ua: subscription.title_ua,
          title_de: subscription.title_de,
        },
      });
    }

    const monobankStatus = await response.json();

    // Оновлюємо статус в базі даних, якщо він змінився
    if (monobankStatus.status && payment.status !== monobankStatus.status) {
      payment.status = monobankStatus.status;

      // Якщо платіж успішний, оновлюємо дати підписки
      if (monobankStatus.status === "success") {
        const now = new Date();
        payment.startDate = now;
        const months = Number(payment.duration);
        payment.endDate = getEndDate(now, months);
      }

      await paymentRepo.save(payment);
    }

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      startDate: payment.startDate,
      endDate: payment.endDate,
      price: payment.price,
      duration: payment.duration,
      monobankStatus: monobankStatus.status,
      subscription: {
        id: subscription.id,
        title: subscription.title,
        title_ua: subscription.title_ua,
        title_de: subscription.title_de,
      },
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching payment status" },
      { status: 500 }
    );
  }
}

function getEndDate(startDate: Date, months: number): Date {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);
  return endDate;
}
