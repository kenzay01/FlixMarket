import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    console.log("Receiving file upload...");

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
    }

    // Process the form data directly without formidable
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Create a unique filename
    const extension = path.extname(imageFile.name) || ".jpg";
    const newFilename = `subscription_${Date.now()}${extension}`;
    const newPath = path.join(uploadDir, newFilename);

    // Convert File to ArrayBuffer, then to Buffer
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Write the file to disk
    await writeFile(newPath, fileBuffer);
    console.log(`File saved to ${newPath}`);

    // Return the path that can be used in the frontend
    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${newFilename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}
