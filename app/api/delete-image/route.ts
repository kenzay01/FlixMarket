import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { unlink } from "fs/promises";

export async function DELETE(req: NextRequest) {
  try {
    // Get the image URL from the query parameters
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("imageUrl");

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "No image URL provided" },
        { status: 400 }
      );
    }

    const filename = path.basename(imageUrl);

    // Construct the full path to the file
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      await unlink(filePath);
      console.log(`File deleted: ${filePath}`);

      return NextResponse.json({
        success: true,
        message: "Image file deleted successfully",
      });
    } else {
      console.log(`File not found: ${filePath}`);
      return NextResponse.json(
        { success: false, message: "Image file not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}
