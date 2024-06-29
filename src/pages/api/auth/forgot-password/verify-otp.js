import usersModel from "@/src/backend/models/users";
import dbConnect from "@/src/backend/config/dbConnect";
import { serialize } from "cookie";
import { GenAccessToken } from "@/src/backend/helpers/jwt";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const foundUser = await usersModel.findById(req.body._id);

    if (!foundUser) {
      res.json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }


    if (!(foundUser.otp?.value == req.body.otp)) {
      res.json({
        success: false,
        message: "Invalid OTP!",
      });
      return;
    }

    var r = await usersModel.findByIdAndUpdate(
      foundUser._id,
      { $set: { otp: { value: "" } } },
      { new: true }
    );

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
      message: "Verification Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
