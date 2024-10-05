import dbConnect from "@/src/backend/config/dbConnect";
import UsersModal from '@/src/backend/models/users'
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  // var userID = await JWTVerify(token);

  switch (req.method) {
    case "GET":
      try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const users = await UsersModal.find({},{password:false}).limit(limit).skip(skip).sort({ createdAt: -1 })
        const total = await UsersModal.find({}).count();

        let starting = total ? skip + 1 : 0;
        let ending = starting + limit - 1 > total ? total : starting + limit - 1;

        res.status(200).json({
          success: true,
          message: {
            data: users,
            count: total,
            starting,
            ending,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Something Went Wrong!",
        });
      }
      break;
  }
}