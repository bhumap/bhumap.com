import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";





const S3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    ACL: 'public-read'
});



const upload = multer({
    storage: multerS3({
      s3: S3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now().toString()+ file.originalname)
      }
    })
  })



export const uploadMiddleware = (handler) => async (req, res) => {
    return new Promise((resolve, reject) => {
      upload.array("file")(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(handler(req, res));
      });
    });
};




//  export const uploadToS3 = async (files) => {
//     const uploadPromises = files.map(async (file) => {
//           try {
//             let fileKey = `${Date.now()}-${file.originalname}`
//             const params = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: fileKey,
//                 Body: file.buffer,
//                 ContentType: file.mimetype
//               };

//             const data = await S3.send(new PutObjectCommand(params))
//             return `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${params.Key}`;
//           } catch (error) {
//             console.error('S3 Upload Error:', error);
//             throw error;
//           }
//     });
  
//     return Promise.all(uploadPromises);
//   };



