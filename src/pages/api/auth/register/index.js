import dbConnect from "@/src/backend/config/dbConnect";
import UsersModal from "@/src/backend/models/users";
import bcrypt from "bcrypt";
import validator from 'validator'
import { serialize } from "cookie";
import { GenAccessToken } from "@/src/backend/helpers/jwt";

export default async function handler(req, res) {
  await dbConnect();

  try {

    if (!req.body.username) {
      res.status(400).json({
        success: false,
        message: "Username Required!",
      });
      return
    }

    if (!req.body.password) {
      res.status(400).json({
        success: false,
        message: "Password Required!",
      });
      return
    }

   if(req.body.email){
    if(!validator.isEmail(req.body.email?.value)){
      res.status(400).json({
        success: false,
        message: "Enter a valid Email Address!",
      });
      return
    }
   }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    var createdUser = await UsersModal.create({
      ...req.body,
      password: hashedPassword,
    });

    // Generating Access Token
    const AccessToken = await GenAccessToken({
      id: createdUser._id,
    });

    // setting Cookies
    res.setHeader(
      "Set-Cookie",
      serialize("AccessToken", AccessToken, {
        path: "/",
        httpOnly: true,
      })
    );


    res.status(201).json({
      success: true,
      message: "Your are Registered Successfully!",
      data:createdUser
    });
    
  } catch (err) {


    // For duplication Error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
      });
    }

    // required fields error handling
    var requiredFildName = Object.keys(err.errors)[0];
    console.log(err)

    if (requiredFildName) {
      return res.status(400).json({
        success: false,
        message: `${requiredFildName} is required!`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }

}