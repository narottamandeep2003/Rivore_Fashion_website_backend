import { v2 } from "cloudinary";
import fs from "fs";
// v2.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadOnCloud = async (URL) => {
  try {
    if (!URL) {
      return null;
    }
    // console.log(v2)
    const response = await v2.uploader.upload(URL, {
      resource_type: "auto",
    });
    console.log("file uploaded", response.url);
    return response;
  } catch (error) {
    // console.log(error)
    fs.unlinkSync(URL);
    return null;
  }
};
export { uploadOnCloud };
