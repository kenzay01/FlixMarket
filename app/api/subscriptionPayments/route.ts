import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { SubscriptionPayment } from "@/entities/SubscriptionPayment";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const paymentsRepository = AppDataSource.getRepository(SubscriptionPayment);
    const payments = await paymentsRepository.find();
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching subscription payments:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
