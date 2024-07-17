import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    // upload the file
    const file = data.get("file");

    const seClient = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const bucket = "food-ordering-next.js";

    await seClient.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    const link = `https://${bucket}.s3.amazonaws.com/` + newFileName;
    return Response.json(link);
  }
  return Response.json(true);
}

// import { uploadToCloudinary } from "@/libs/cloudinaryConfig";

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get("file");

//   const fileBuffer = await file.arrayBuffer();

//   const mimeType = file.type;
//   const encoding = "base64";
//   const base64Data = Buffer.from(fileBuffer).toString("base64");

//   // this will be used to upload the file
//   const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
//   const folderName = "profile";
//   const res = await uploadToCloudinary(fileUri, file.name, folderName);

//   if (res.success && res.result) {
//     return Response.json({
//       message: "success",
//       imgUrl: res.result.secure_url,
//     });
//   } else return Response.json({ message: "failure" });
// }
