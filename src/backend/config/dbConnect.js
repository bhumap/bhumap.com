import mongoose from "mongoose";

const dbConnect = async () => {
  console.log(" -----------",process.env.DB_URI)

  if (mongoose?.connection?.readyState >= 1){
    return
  };
  mongoose.set('debug', true);
  console.log(" -----------",process.env.DB_URI)
  await mongoose.connect(process.env.DB_URI)
};

export default dbConnect;