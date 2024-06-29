import dbConnect from "@/src/backend/config/dbConnect";
import userModel from "@/src/backend/models/users";
import { JWTVerify } from "@/src/backend/helpers/jwt";



export default async function handler(req, res) {
  await dbConnect();

  try {

    var token = req.cookies.AccessToken || "";
    var userID = await JWTVerify(token) || req.query.id

    const foundUser = await userModel.findById(userID ,{password:false});
    

    if (!foundUser) {
      res.json({
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
