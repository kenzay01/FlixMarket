import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db";
import { User } from "@/entities/User";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, newEmail } = await req.json();

    if (!name || !email || !newEmail) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);

    // Ваша логіка для пошуку користувача (наприклад, за ID або email)
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Оновлення профілю
    user.name = name;
    user.email = newEmail;

    await userRepository.save(user);

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
