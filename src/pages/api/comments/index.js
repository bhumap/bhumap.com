import dbConnect from "@/src/backend/config/dbConnect";
import CommentsModel from "@/src/backend/models/comments";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = await JWTVerify(token) || req.query.id


  switch (req.method) {
    case "GET":
      try {
        var match = {};

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        if (req.query.keyword) {
          match.$or = [
            { fullName: new RegExp(req.query.keyword, "i") },
            { department: new RegExp(req.query.keyword, "i") },
          ];
        }

        if(req.query.property){
          match.property = new ObjectId(req.query.property)
        }

        

        const comments = await CommentsModel.find(match).populate("user","fullName photo").populate("replies.user","fullName photo")
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        const total = await CommentsModel.countDocuments(match);

        var starting = total ? skip + 1 : 0;
        var ending =
          starting + limit - 1 > total ? total : starting + limit - 1;

        res.status(200).json({
          success: true,
          message: {
            data: comments,
            count: total,
            starting,
            ending,
          },
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
      break;
    case "POST":
      try {

        var item

        if(req.query.commentId){
          item = await CommentsModel.findByIdAndUpdate(req.query.commentId,{$push:{replies:{...req.body,user:(userID || process.env.ANONYMOUSE_USER_ID)}}},{new:true});
        }else{
          item = await CommentsModel.create({...req.body,user:(userID || process.env.ANONYMOUSE_USER_ID)});
        }

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

        console.log(err)

        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
  }
}
