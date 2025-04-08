import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// For Next.js 15+ where params is a Promise
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    // Await the params Promise
    const params = await context.params;
    const filename = params.filename;
    const filePath = path.join(process.cwd(), "uploads", filename);

    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("Image not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();

    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
