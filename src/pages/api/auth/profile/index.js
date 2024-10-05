import dbConnect from "@/src/backend/config/dbConnect";
import userModel from "@/src/backend/models/users";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
import MembershipModel from "@/src/backend/models/memberships";

export default async function handler(req, res) {
  await dbConnect();

  try {

    var token = req.cookies.AccessToken || "";
    var userID = await JWTVerify(token);

    const user = await userModel.findById(userID ,{password:false});
    

    if (!user) {
      res.json({
        success: false,
        message: null,
      });
      return;
    }

    const membership = await MembershipModel.findOne({
      $and: [
          {
              user_id: userID,
          },
          {
              status: 'Active'
          }
      ]
    })
    .populate('membership_package_id', 'name amount expire_date');

    res.status(StatusCodes.OK).json({
      success: true,
      message: {user, membership},
      
    });


  } catch (error) {

    if(error.kind == "ObjectId"){
      res.status(StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: null,
      });
      return;
    }



    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
