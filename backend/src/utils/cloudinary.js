import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(
      "file is uploaded on cloudinary",
      response.url,
      response.secure_url
    );

    return response;
  } catch (error) {
    fs.unlinkSync(filePath); // for removing the local saved file
    return null;
  }
};
