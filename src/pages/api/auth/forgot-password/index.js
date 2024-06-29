import usersModel from "@/src/backend/models/users";
import dbConnect from "@/src/backend/config/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const { username } = req.body;


    if (!username) {
      res.status(400).json({
        success: false,
        message: "Username or Email or Phone is Required!",
      });
      return;
    }

    const foundUser = await usersModel.findOne({ $or:[{username},{"email.value":username},{"phone.value":username}] },{email:true,phone:true});

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "User Found Successfully!",
      data:foundUser
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
