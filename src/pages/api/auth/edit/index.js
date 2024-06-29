import dbConnect from "@/src/backend/config/dbConnect";
import UserModel from "@/src/backend/models/users";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const postId = req.body._id;

    const updateUser = await UserModel.findByIdAndUpdate(
      postId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updateUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: updateUser,
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
