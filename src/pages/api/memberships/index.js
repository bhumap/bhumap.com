import dbConnect from "@/src/backend/config/dbConnect";
import MembershipModel from "@/src/backend/models/memberships";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
const { ObjectId } = require("mongoose").Types;
import Joi from "joi";

const membershipValidationSchema = Joi.object({
    membership_package_id: Joi.string().hex().length(24).required(),
    user_id: Joi.string().hex().length(24).required(),
    image: Joi.string().uri().optional().allow(null),
    utr_number: Joi.string().min(3).required(),
    expire_date: Joi.date().iso().greater('now').required(),
    activation_date: Joi.date().iso().required(),
    duration_in_months: Joi.number().integer().min(1).required(),
    term_and_condition: Joi.boolean().optional(),
    status: Joi.string().valid("Active", "Pending", "Expired").required()
});

export default async function(req, res) {
    await dbConnect();

    var token = req.cookies.AccessToken || "";
    var userID = (await JWTVerify(token)) || req.query.id;

    switch(req.method) {
        case "POST":
            try {
                const { error, value } = membershipValidationSchema.validate(req.body, { abortEarly: false });
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                const membership = await MembershipModel.find({
                    $and: [
                        {
                            user_id: req.body.user_id,
                        },
                        {
                            status: 'Active'
                        }
                    ]
                });

                if (membership.length > 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Membership Already Active'
                    })
                }

            const memberShip = new MembershipModel(value)
            await memberShip.save();

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: 'Membership updated successfully'
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

                    const memberships = await MembershipModel.find({
                    })
                    .limit(limit)
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .populate('membership_package_id', 'name amount') 
                    .populate('user_id', 'fullName');

                    const total = await MembershipModel.find({}).count();
                    const starting = total ? skip + 1 : 0;
                    const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                    res.status(StatusCodes.OK).json({
                        success: true,
                        message: {
                            data: memberships,
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