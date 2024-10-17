import dbConnect from "@/src/backend/config/dbConnect";
import TransactionsModel from "@/src/backend/models/transactions";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
const { ObjectId } = require("mongoose").Types;
import usersModel from "@/src/backend/models/users";
import Joi from "joi";

const transactionValidationSchema = Joi.object({
    user_id: Joi.string().required(), 
    amount: Joi.number().positive().precision(2).optional(), 
    utr_number: Joi.string().required(),
    type: Joi.string().valid('credit', 'debit').optional().allow(''),
    description: Joi.string().optional().allow(''),  
    images: Joi.array().items(
      Joi.object({
        secure_url: Joi.string().uri().required(),
        public_id: Joi.string().required(),
      })
    ).optional(),
    by_admin: Joi.object({
        amount: Joi.number().positive().precision(2).optional(),
        is_processed: Joi.boolean().required()
    }).optional(),
    transaction_date: Joi.date().default(() => new Date(), 'current date'),
});

export default async function handler(req, res) {
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
        case "PUT":
            try {
                let user = null;
                if (userID) {
                    user = await usersModel.findById(new ObjectId(userID));
                }

                const { id } = req.query;
                const { error, value } = transactionValidationSchema.validate(req.body, { abortEarly: false });
                    
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                const transaction = await TransactionsModel.findById(id);
                if (!transaction) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "transaction not found"
                    });
                }

                await TransactionsModel.findByIdAndUpdate(id, {...value}, { new: true });

                if(user.userType === "Admin") {
                    const amountToUpdate = value.by_admin.amount;

                    if (amountToUpdate !== undefined && value.by_admin?.is_processed) { // Ensure amount exists
                        const walletUpdate = {
                            $inc: {
                                'wallet.balance': (transaction.type === "credit" ? amountToUpdate : -amountToUpdate),
                            }
                        };
                        await usersModel.findByIdAndUpdate(userID, walletUpdate, { new: true });
                    }
                }

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'transaction updated successfully!'
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        case "GET":
            try {
                const { id } = req.query;

                const transaction = await TransactionsModel.findById(id);
                if (!transaction) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "transaction not found"
                    });
                }

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'transaction fetch successfully!',
                    data: transaction
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);

    }
}