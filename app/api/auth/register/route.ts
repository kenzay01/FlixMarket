// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { type NextRequest } from "next/server";
import { AppDataSource } from "../../../../lib/db";
import { User } from "../../../../entities/User";

export async function POST(request: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const body = await request.json();
    const { name, email, password } = body;

    // Валідація даних
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Усі поля обов'язкові" },
        { status: 400 }
      );
    }

    // Підключення до репозиторію
    const userRepository = AppDataSource.getRepository(User);

    // Перевірка, чи користувач з такою поштою вже існує
    const existingUser = await userRepository.findOne({
      where: { email },
    });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з такою адресою електронної пошти вже існує" },
        { status: 409 }
      );
    }

    // Хешування пароля
    const hashedPassword = await hash(password, 10);

    // Створення нового користувача
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // За замовчуванням роль "user"
    });

    // Збереження користувача в базі даних
    console.log("Новий користувач перед збереженням:", newUser);

    await userRepository.save(newUser);

    // Повертаємо успішну відповідь
    return NextResponse.json(
      {
        message: "Користувач успішно зареєстрований",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return NextResponse.json(
      { message: `Сталася помилка при реєстрації користувача: ${error}` },
      { status: 500 }
    );
  }
}
