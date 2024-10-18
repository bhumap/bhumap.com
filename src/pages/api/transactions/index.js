import dbConnect from "@/src/backend/config/dbConnect";
import TransactionsModel from "@/src/backend/models/transactions";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
const { ObjectId } = require("mongoose").Types;
import usersModel from "@/src/backend/models/users";
import Joi from "joi";

const transactionValidationSchema = Joi.object({
    amount: Joi.number().positive().precision(2).optional(), 
    utr_number: Joi.string().required(),
    type: Joi.string().valid('credit', 'debit', 'recharge').optional().allow(''),
    description: Joi.string().optional().allow(''),  
    images: Joi.array().items(
      Joi.object({
        secure_url: Joi.string().uri().required(),
        public_id: Joi.string().required(),
      })
    ).required(),
    // transaction_date: Joi.date().default(() => new Date(), 'current date'),
});

export default async function(req, res) {
    await dbConnect();

    let token = req.cookies.AccessToken || "";
    let userID = await JWTVerify(token);

    if (!userID) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
            success: false,
            message: "Unauthorized Action!",
        });
    }

    switch(req.method) {
        case "POST":
            try {
                const { error, value } = transactionValidationSchema.validate(req.body, { abortEarly: false });
                
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                const transaction = new TransactionsModel({...value, user_id: new ObjectId(userID)});
                await transaction.save();

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Transaction Saved Successfully!'
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        case "GET":
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;

                let user = null;
                if (userID) {
                    user = await usersModel.findById(new ObjectId(userID));
                }

                const query = {};

                if (user && (user.userType === 'Buyer' || user.userType === 'Seller' || user.userType === 'Advisor')) {
                    query.user_id = new ObjectId(user._id);
                }

                const transactions = await TransactionsModel.find(query)
                    .limit(limit)
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .populate('user_id', 'fullName phone.value');

                const total = await TransactionsModel.find(query).count();
                const starting = total ? skip + 1 : 0;
                const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: {
                        data: transactions,
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