import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";

cloudinary.config({
  cloud_name: "dmv4xwwqk",
  api_key: "217882255114289",
  api_secret: "O8bppRE2C-Hl7j2xhNZw5JAvN5k",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (public_id, resource_type) => {
  if (!public_id) return null;
  try {
    return await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { uploadOnCloudinary, deleteOnCloudinary };
