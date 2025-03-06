import dbConnect from "@/src/backend/config/dbConnect";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import PropertiesModel from "@/src/backend/models/property";
import PropertyViewsModel from "@/src/backend/models/property-views";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export default async function handler(req, res) {
  try {
    await dbConnect();

    console.log("Request Query:", req.query);

    const token = req.query.AccessToken || "";
    let userID =  await JWTVerify(token) ;


    if (!mongoose.isValidObjectId(req.query.propertyID)) {
      return res.status(400).json({ success: false, message: "Invalid Property ID" });
    }

    const property = await PropertiesModel.findById(req.query.propertyID)
      .populate("owner", "fullName photo phone username email");

    if (!property) {
      return res.status(404).json({ success: false, message: "Property Not Found!" });
    }

    if (userID) {
      const alreadyViewed = await PropertyViewsModel.findOne({
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

    return res.json({ success: true, message: property });
  } catch (error) {
    console.error("Error Fetching Property:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
