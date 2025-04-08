import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { Subscription } from "@/entities/Subscription";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const subscriptionRepo = AppDataSource.getRepository(Subscription);
    const subscriptionCount = await subscriptionRepo.count();

    if (subscriptionCount > 0) {
      return NextResponse.json({
        success: true,
        message: "DB already initialized",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
