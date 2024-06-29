import dbConnect from "@/src/backend/config/dbConnect";
import CommentsModel from "@/src/backend/models/comments";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  await dbConnect();

  var foundItem;

  var token = req.cookies.AccessToken || "";
  var userID = (await JWTVerify(token)) || req.query.id;

  try {
    foundItem = await CommentsModel.findById(req.query.id).populate(
      "owner",
      "fullName photo phone username"
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
        var response;
        if (req.query.likeDislike) {
          var d = await CommentsModel.findOne({
            _id: new ObjectId(req.query.id),
            likes: { $in: userID },
          });
          if (d) {
            response = await CommentsModel.findByIdAndUpdate(
              req.query.id,
              { $pull: { likes: userID } },
              { new: true }
            );
          } else {
            response = await CommentsModel.findByIdAndUpdate(
              req.query.id,
              { $push: { likes: userID } },
              { new: true }
            );
          }
        }else{
          response = await CommentsModel.findByIdAndUpdate(
            req.query.id,
            { $set: req.body },
            { new: true }
          );
        }
        res.status(201).json({
          success: true,
          message: "Updated Successfully!",
          data: response,
        });
        break;
      case "DELETE":
        await CommentsModel.findByIdAndDelete(req.query.id);
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
