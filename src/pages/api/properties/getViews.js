import dbConnect from "@/src/backend/config/dbConnect";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import PropertyViewsModel from "@/src/backend/models/property-views";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  try {
    await dbConnect();

    var token = req.cookies.AccessToken || "";
    var userID = (await JWTVerify(token));


    var alreadyViewed = await PropertyViewsModel.find({user: new ObjectId(userID)}).populate("property")

    res.json({
        success:true,
        message:{
          data:alreadyViewed
        }
    })



  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
