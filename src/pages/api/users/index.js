import dbConnect from "@/src/backend/config/dbConnect";
import UsersModal from '@/src/backend/models/users'

export default async function handler(req, res) {
  await dbConnect();
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

        if(req.query.courseEditingUsers){
          const users = await UsersModal.find({$and:[{"rights.resource":"courses"},{"rights.accessType":{$ne:"readOnly"}},{isAdmin:false}]},{otp:false,password:false})
          res.status(200).json({
            success: true,
            message: {
              data: users,
            },
          });
          return
        }

        const users = await UsersModal.find(match,{rights:false,password:false,otp:false}).limit(limit).skip(skip).sort({isAdmin:-1})
        const total = await UsersModal.find(match).count();

        var starting = total ? skip + 1 : 0;
        var ending =
          starting + limit - 1 > total ? total : starting + limit - 1;

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
        res.status(500).json({
          success: false,
          message: "Something Went Wrong!",
        });
      }
      break;
  }
}