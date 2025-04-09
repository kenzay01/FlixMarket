// api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    // console.log("Receiving file upload...");

    // Створюємо директорію uploads поза public
    const uploadDir = path.join(process.cwd(), "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
    }

    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Створюємо унікальне ім'я файлу
    const extension = path.extname(imageFile.name) || ".jpg";
    const newFilename = `subscription_${Date.now()}${extension}`;
    const newPath = path.join(uploadDir, newFilename);

    // Конвертуємо File в Buffer
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Зберігаємо файл на диску
    await writeFile(newPath, fileBuffer);

    // Повертаємо шлях для використання у фронтенді
    return NextResponse.json({
      success: true,
      imageUrl: `/api/images/${newFilename}`, // Шлях до API для отримання зображення
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}
