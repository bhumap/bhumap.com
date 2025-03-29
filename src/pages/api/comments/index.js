import dbConnect from "@/src/backend/config/dbConnect";
import CommentsModel from "@/src/backend/models/comments";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { sendEmail } from "@/src/backend/helpers/sendNodemail";
import PropertiesModel from "@/src/backend/models/property";
import mongoose from "mongoose";
import { sendComments } from "@/src/backend/helpers/templates/sendComments";
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

        if (req.query.keyword) {
          match.$or = [
            { fullName: new RegExp(req.query.keyword, "i") },
            { department: new RegExp(req.query.keyword, "i") },
          ];
        }

        if (req.query.property) {
          match.property = new ObjectId(req.query.property);
        }

        const comments = await CommentsModel.find(match)
          .populate("user", "fullName photo")
          .populate("replies.user", "fullName photo email")
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
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var item;

        if (req.query.commentId) {
          item = await CommentsModel.findByIdAndUpdate(
            req.query.commentId,
            {
              $push: {
                replies: {
                  ...req.body,
                  user: userID || process.env.ANONYMOUSE_USER_ID,
                },
              },
            },
            { new: true }
          ).populate("replies.user", "fullName photo email").populate("user","email").populate({
            path:"property",
            populate:{
              path:"owner",
              select:"email"
            }
          });


        } else {
          item = await CommentsModel.create({
            ...req.body,
            user: userID || process.env.ANONYMOUSE_USER_ID,
          });
        }

        const propertyOwner = await PropertiesModel.findById(
          req?.body?.property
        ).populate("owner", "email fullName _id");

      


        //Email Notification for Commentors
        if (propertyOwner && propertyOwner?.owner?.id != userID && !item.replies.length) {
          await sendEmail({
            receiverEmail: propertyOwner.owner.email.value,
            subject: "New Comment",
            message: item?.text,
            html: sendComments(propertyOwner?.owner?.fullName, item?.text, item?.property)
          });
        }

        

        //Email Noticafication for Replyiers
        if(item.replies.length > 0){

          let repliesEmails = item?.replies.filter((reply) => reply?.user?.id != userID).map((reply) => reply?.user?.email?.value);
          repliesEmails.push(item?.user?.email?.value);
          repliesEmails.push(item?.property?.owner?.email?.value); 
          repliesEmails = [...new Set(repliesEmails)]

          await sendEmail({  
            receiverEmail: repliesEmails.join(","),
            subject: "New Reply",
            message: item?.text,
            html:sendComments("Bhumap User",item?.text, item.property?._id)
          });
          
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
        // var requiredFildName = Object.keys(err.errors)[0];
        // if (requiredFildName) {
        //   return res.status(400).json({
        //     success: false,
        //     message: `${requiredFildName} is required!`,
        //   });
        // }

        // console.log(err);

        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
  }
}
