import ImageKit from "@imagekit/nodejs";
import { CONFIG } from "../config/config.js";

const client = new ImageKit({
  privateKey: CONFIG.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async ({ buffer, fileName, folder = "snitch" }) => {
  try {
    const result = await client.files.upload({
      file: await ImageKit.toFile(buffer),
      fileName,
      folder,
    });

    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
