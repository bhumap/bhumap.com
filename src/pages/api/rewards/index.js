import dbConnect from "@/src/backend/config/dbConnect";
import RewardsModel from "@/src/backend/models/rewards";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
    await dbConnect();

    var token = req.cookies.AccessToken || "";
    var userID = await JWTVerify(token);

    switch(req.method) {
        case "GET": 
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;
                
                const reawrds = await RewardsModel.find({
                    referred_by: userID
                })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 })
                .populate('referred_by', 'fullName') 
                .populate('referred_to', 'fullName');

                const total = await RewardsModel.countDocuments({referred_by: userID});
                const starting = total ? skip + 1 : 0;
                const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: {
                        data: reawrds,
                        count: total,
                        starting,
                        ending,
                    },
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
    }
}