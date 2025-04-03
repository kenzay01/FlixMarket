export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const uploadResponse = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });
    if (!uploadResponse.ok) {
      throw new Error(
        `Помилка завантаження зображення: ${uploadResponse.statusText}`
      );
    }
    const uploadData = await uploadResponse.json();
    if (uploadData.success) {
      console.log("Uploaded image URL:", uploadData.imageUrl);
      return uploadData.imageUrl; // /uploads/subscription_17123456789.jpg
    } else {
      console.error("Upload failed:", uploadData.message);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
