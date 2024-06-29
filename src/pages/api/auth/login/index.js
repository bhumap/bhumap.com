import usersModel from "@/src/backend/models/users";
import dbConnect from "@/src/backend/config/dbConnect";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { GenAccessToken } from "@/src/backend/helpers/jwt";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const { username, password } = req.body;


    if ((!username) || (!password)) {
      res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
      return;
    }

    const foundUser = await usersModel.findOne({ $or:[{username},{"email.value":username},{"phone.value":username}] });

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
      return;
    }

    // Compare provided password with hashed password
    const IspasswordValid = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!IspasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
      return;
    }

    // Generating Access Token
    const AccessToken = await GenAccessToken({
      id: foundUser._id,
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
      message: "User Login Successfully!",
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
