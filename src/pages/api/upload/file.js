import dbConnect from "@/src/backend/config/dbConnect";
import { uploadMiddleware, uploadToS3 } from "@/src/backend/helpers/uploadfiles";

async function handler(req, res) {
  await dbConnect();
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        // const data = await req.formData()
        console.log("Request Query:", "hello world");

        // const data = await uploadToS3(req.files);

        return res.json({data:req.files});
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed!" });
      break;
  }
}


export default uploadMiddleware(handler);


export const config = {
  api: {
    bodyParser: false,
  }
};
