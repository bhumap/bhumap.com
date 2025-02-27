import dbConnect from "@/src/backend/config/dbConnect";
import PropertiesModel from "@/src/backend/models/listing";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = (await JWTVerify(token)) || req.query.id;

  try {

    var match = {
      owner:new ObjectId(userID)
    };

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    if (req.query.s) {
      match.$or = [
        { title: new RegExp(req.query.keyword, "i") },
      ];
    }

    if (req.query.status) {
      match.status = req.query.status;
    }

    const properties = await PropertiesModel.find(match)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const total = await PropertiesModel.countDocuments(match);

    var starting = total ? skip + 1 : 0;
    var ending = starting + limit - 1 > total ? total : starting + limit - 1;

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
}
