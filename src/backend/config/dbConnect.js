import mongoose from "mongoose";

const dbConnect = async () => {
  console.log(" -----------",process.env.DB_URI, process.env.MAILJET_SENDER_NAME, process.env.JWT_SECRET, process.env.FAST2SMS_API_KEY)

  if (mongoose?.connection?.readyState >= 1){
    return
  };
  mongoose.set('debug', true);
  console.log(" -----------",process.env.DB_URI)
  await mongoose.connect(process.env.DB_URI)
};

export default dbConnect;