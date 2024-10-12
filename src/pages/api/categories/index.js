import dbConnect from "@/src/backend/config/dbConnect";
import { StatusCodes } from 'http-status-codes';
import CategoriesModel from "@/src/backend/models/categories";

export default async function handler(req, res) {
    await dbConnect();

    switch(req.method) {
        case "GET":
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;

                const categories = await CategoriesModel.find({
                })
                .limit(limit)
                .skip(skip);

                const total = await CategoriesModel.find({}).count();
                const starting = total ? skip + 1 : 0;
                const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: {
                        data: categories,
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