import dbConnect from "@/src/backend/config/dbConnect";
import PropertiesModel from "@/src/backend/models/listing";
import { JWTVerify } from "@/src/backend/helpers/jwt";
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

        if (req.query.s) {
          match.$or = [
            { title: new RegExp(req.query.s, "i") },
            { "address.zipCode": new RegExp(req.query.s, "i") },
          ];
        }

        if (req.query.purpose) {
          match.purpose = req.query.purpose;
        }

        if (req.query.type) {
          match.propertyType = req.query.type;
        }

        if (req.query.subtype) {
          match.residentialSubType = req.query.subtype;
        }

        const properties = await PropertiesModel.find(
          { ...match, status: "Published" },
          { description: false, features: false }
        )
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        const total = await PropertiesModel.find(match).count();

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

        res.status(201).json({
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
