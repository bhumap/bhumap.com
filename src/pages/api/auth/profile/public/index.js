import dbConnect from "@/src/backend/config/dbConnect";
import userModel from "@/src/backend/models/users";



export default async function handler(req, res) {
  await dbConnect();

  try {
    
    const foundUser = await userModel.findById(req.query.id ,{password:false});

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: foundUser,
    });


  } catch (error) {

    if(error.kind == "ObjectId"){
      res.status(400).json({
        success: false,
        message: null,
      });
      return;
    }


    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
