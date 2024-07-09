import dbConnect from "@/src/backend/config/dbConnect";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import PropertiesModel from "@/src/backend/models/property";
import PropertyViewsModel from "@/src/backend/models/property-views";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  try {
    await dbConnect();

    var token = req.query.AccessToken || "";
    var userID = await JWTVerify(token);

    var property = await PropertiesModel.findById(
      req.query.propertyID
    ).populate("owner", "fullName photo phone username email");
    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property Not Found!",
      });
      return;
    }

    // console.log(userID)

    if (userID) {
      var alreadyViewed = await PropertyViewsModel.findOne({
        user: userID,
        property: new ObjectId(req.query.propertyID),
      });
      if (!alreadyViewed) {
        await PropertyViewsModel.create({
          user: userID,
          property: new ObjectId(req.query.propertyID),
        });
      }
    }

    res.json({
      success: true,
      message: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
