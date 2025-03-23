import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { type NextRequest } from "next/server";
// Припускаємо, що у вас є якась модель для роботи з користувачами
// Тут я наведу приклад з простим підходом

// Примітка: в реальному проекті, вам потрібно зберігати користувачів у базі даних
// Це просто приклад для демонстрації логіки
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@gmail.com",
    password: "hashed_admin_password", // В реальному проекті це має бути хешований пароль
    role: "admin",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Валідація даних
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Усі поля обов'язкові" },
        { status: 400 }
      );
    }

    // Перевірка, чи користувач з такою поштою вже існує
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з такою адресою електронної пошти вже існує" },
        { status: 409 }
      );
    }

    // Хешування пароля
    const hashedPassword = await hash(password, 10);

    // Створення нового користувача
    // В реальному проекті тут буде код для збереження користувача в базі даних
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: "user", // За замовчуванням роль "user"
    };

    // Додаємо користувача до масиву (в реальному проекті - до бази даних)
    users.push(newUser);

    // Повертаємо успішну відповідь
    return NextResponse.json(
      { message: "Користувач успішно зареєстрований" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Сталася помилка при реєстрації користувача: ${error}` },
      { status: 500 }
    );
  }
}
