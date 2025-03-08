import dbConnect from "@/src/backend/config/dbConnect";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import PropertiesModel from "@/src/backend/models/property";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();
  var foundItem;

  try {
    foundItem = await PropertiesModel.findById(req.query.id).populate(
      "owner",
      "fullName photo phone username email"
    );
    if (!foundItem) {
      res.status(404).json({
        success: false,
        message: "Not Found!",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Id sent!",
    });
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({
          success: true,
          message: foundItem,
        });
        break;
      case "PUT":
        var token = req.cookies.AccessToken || "";
        var userID = await JWTVerify(token);
        
        if(!userID || !token){
          return res.status(401).json({
            success: false,
            message: "Unauthorized Access!",
          });
        } 

        const likeExist = await PropertiesModel.findById(req.query.id);

        console.log(userID,"userID");

        if(likeExist.likes.includes(userID)){
          const response = await PropertiesModel.findByIdAndUpdate(
            req.query.id,
            { $pull: { likes: new mongoose.Types.ObjectId(userID) } },
            { new: true }
          );
          
          res.status(201).json({
            success: false,
            message: "You unliked this property!",
            data: response,
          });
          return;
        }

        var response = await PropertiesModel.findByIdAndUpdate(
          req.query.id,
          { $push: { likes: new mongoose.Types.ObjectId(userID) } },
          { new: true }
        );

        res.status(201).json({
          success: true,
          message: "You liked this property!",
          data: response,
        });
        break;
      case "DELETE":
        await PropertiesModel.findByIdAndDelete(req.query.id);
        res.status(200).json({
          success: true,
          message: "Deleted Successfully!",
        });
        break;
      default:
        res.status(500).json({
          success: false,
          message: "Method Not Allowed!",
        });
    }
  } catch (err) {
    // For duplicate Error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
      });
    }

    // required fields error handling
    if (err.errors) {
      var requiredFildName = Object.keys(err.errors)[0];

      if (requiredFildName) {
        return res.status(400).json({
          success: false,
          message: `${requiredFildName} is required!`,
        });
      }
    }

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
}
