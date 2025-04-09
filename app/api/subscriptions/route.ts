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

export async function POST(req: Request) {
  try {
    const subscriptionData = await req.json();

    const hasAnyTitle =
      (subscriptionData.regions?.includes("en") && subscriptionData.title) ||
      (subscriptionData.regions?.includes("de") && subscriptionData.title_de) ||
      (subscriptionData.regions?.includes("ua") && subscriptionData.title_ua);

    if (!hasAnyTitle) {
      return NextResponse.json(
        {
          error:
            "Необхідно вказати назву підписки хоча б для одного вибраного регіону",
        },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    // Створюємо нову підписку

    // console.log("Creating subscription with data:", subscriptionData);

    const newSubscription = subscriptionRepository.create(subscriptionData);

    // console.log("New subscription object:", newSubscription);

    const savedSubscription = await subscriptionRepository.save(
      newSubscription
    );

    return NextResponse.json(savedSubscription, { status: 201 });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    // Find subscription by ID
    const subscription = await subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Update subscription with new data
    subscriptionRepository.merge(subscription, updateData);
    const updatedSubscription = await subscriptionRepository.save(subscription);

    return NextResponse.json(updatedSubscription);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    // Find subscription by ID
    const subscription = await subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Delete the subscription
    await subscriptionRepository.remove(subscription);

    return NextResponse.json(
      { message: "Subscription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
