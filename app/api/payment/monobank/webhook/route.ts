// src/app/api/payment/monobank/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { SubscriptionPayment } from "@/entities/SubscriptionPayment";

interface MonobankWebhookPayload {
  invoiceId: string;
  status: string;
  amount: number;
  ccy: number;
  reference: string; // payment.id
  createdDate: number;
  modifiedDate: number;
  failureReason?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Ініціалізація підключення до БД
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const payload = (await request.json()) as MonobankWebhookPayload;
    // console.log("Monobank webhook received:", payload);

    const { reference, status } = payload;

    // Отримання платежу з бази даних
    const paymentRepo = AppDataSource.getRepository(SubscriptionPayment);
    const payment = await paymentRepo.findOne({
      where: { id: reference },
    });

    if (!payment) {
      console.error(`Payment with id ${reference} not found`);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Обробка різних статусів платежу
    // Документація Monobank: https://api.monobank.ua/docs/acquiring.html

    // console.log(`Processing status: ${status}`);
    switch (status) {
      case "success":
        // Успішний платіж
        const today = new Date();
        const months = Number(payment.duration); // Кількість місяців з підписки

        payment.status = "paid";
        payment.startDate = today;
        payment.endDate = getEndDate(today, months);
        // await paymentRepo.save(payment);
        break;

      case "processing":
        // Платіж в обробці
        // await paymentRepo.update(payment.id, {
        //   status: "processing",
        // });
        payment.status = "processing";
        // await paymentRepo.save(payment);
        break;

      case "failure":
        // Платіж відхилено
        // await paymentRepo.update(payment.id, {
        //   status: "failed",
        // });
        payment.status = "failed";
        // await paymentRepo.save(payment);
        break;

      case "reversed":
        // Платіж скасовано
        // await paymentRepo.update(payment.id, {
        //   status: "reversed",
        // });
        payment.status = "reversed";
        // await paymentRepo.save(payment);
        break;

      case "expired":
        // Час платежу минув
        // await paymentRepo.update(payment.id, {
        //   status: "expired",
        // });
        payment.status = "expired";
        // await paymentRepo.save(payment);
        break;
    }
    // console.log(`Updating payment ${payment.id} to status: ${payment.status}`);
    await paymentRepo.save(payment);
    // console.log(`Payment update completed`);

    // Підтвердження отримання вебхуку
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Monobank webhook:", error);
    return NextResponse.json(
      { error: "An error occurred while processing webhook" },
      { status: 500 }
    );
  }
}

// Функція для розрахунку дати закінчення підписки
function getEndDate(startDate: Date, months: number): Date {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);
  return endDate;
}
