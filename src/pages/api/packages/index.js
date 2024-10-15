import dbConnect from "@/src/backend/config/dbConnect";
import PackageModel from "@/src/backend/models/packages";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';

export default async function (req, res) {
    await dbConnect();

    switch(req.method) {
        case "GET":
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;

                const packages = await PackageModel.find({})
                .limit(limit)
                .skip(skip);

                const total = await PackageModel.find({}).count();
                const starting = total ? skip + 1 : 0;
                const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: {
                        data: packages,
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
    }
}