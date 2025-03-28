import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { Subscription } from "@/entities/Subscription";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const subscriptionRepository = AppDataSource.getRepository(Subscription);
    const subscriptions = await subscriptionRepository.find();
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
