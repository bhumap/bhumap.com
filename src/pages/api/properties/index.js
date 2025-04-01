import dbConnect from "@/src/backend/config/dbConnect";
import PropertiesModel from "@/src/backend/models/property";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { uploadMiddleware } from "@/src/backend/helpers/uploadfiles";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = (await JWTVerify(token)) || req.query.id;

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;


        // if (req.query.s) {
        //   match.$or = [
        //     { title: new RegExp(req.query.s, "i") },
        //     { "address.zipCode": new RegExp(req.query.s, "i") },
        //   ];
        // }

        if (req.query.purpose) {
          req.query.purpose === "buy" ? (match.purpose = "Sale") : (match.purpose = "Rent") ;
        }

        if (req.query.propertyType) {
          // ["plot", "industrial", "commercial", "residential", "agricultural"].includes(req.query.propertyType)
          match.propertyType = new RegExp(req.query.propertyType, "i")
        }

        if (req.query.subtype) {
          match.residentialSubType = new RegExp(req.query.subtype, "i")
        }

          req.query.zipCode  && (match["address.zipCode"] = req.query.zipCode);
          req.query.cityTown  && (match["address.cityTown"] = new RegExp(req.query.cityTown, "i"));
          // req.query.type && (match["propertyType"] = req.query.type);
        
          console.log(match, "::::::match::::::::")
        
        const properties = await PropertiesModel.find(
          { ...match, status: "Published" },
          { description: false, features: false }
        )
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        const total = await PropertiesModel.countDocuments(match);

        var starting = total ? skip + 1 : 0;
        var ending =
          starting + limit - 1 > total ? total : starting + limit - 1;

        res.status(200).json({
          success: true,
          message: {
            data: properties,
            count: total,
            starting,
            ending,
          },
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var token = req.cookies.AccessToken || "";
        var userID = (await JWTVerify(token)) || req.query.id;
         
        if (!req.body.title) {
          return res.status(400).json({
            success: false,
            message: "Title is Required!",
          });
        }

        var item = await PropertiesModel.create({ ...req.body, owner: userID });

        return res.status(201).json({
          success: true,
          message: "Added Successfully!",
          data: item,
        });
      } catch (err) {
        // For duplicate Error
        if (err.code === 11000) {
          return res.status(409).json({
            success: false,
            message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
          });
        }

        // required fields error handling
        var requiredFildName = Object.keys(err.errors)[0];
        if (requiredFildName) {
          return res.status(400).json({
            success: false,
            message: `${requiredFildName} is required!`,
          });
        }

        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
  }
}
