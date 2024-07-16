import uniqid from "uniqid";
const cloudinary = require("cloudinary").v2;

export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    // upload the file
    const file = data.get("file");

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;
    
    console.log("==================");
    const result = await cloudinary.uploader.upload(newFileName);
    return Response.json(result);
  }
  return Response.json(true);
}
