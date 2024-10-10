import dbConnect from "@/src/backend/config/dbConnect";
import ProductsModel from "@/src/backend/models/products";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
const { ObjectId } = require("mongoose").Types;
import Joi from "joi";

const productValidationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    uom: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    category_id: Joi.string().hex().length(24).required(),
    images: Joi.array().items(
        Joi.object({
            secure_url: Joi.string().uri().required(),
            public_id: Joi.string().required()
        })
    ).optional(),
    status: Joi.string().valid("drafted", "publish", "delete", "inactive").default("drafted").required()
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    console.log('1');
    await dbConnect();
    
    var token = req.cookies.AccessToken || "";
    // var userID = await JWTVerify(token);

    // if (!userID) {
    //     return res.status(StatusCodes.BAD_GATEWAY).json({
    //         success: false,
    //         message: "Unauthorized Action!",
    //     });
    // }

    switch(req.method) {
        case "POST":
            try {
                const { error, value } = productValidationSchema.validate(req.body, { abortEarly: false });
                
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                const product = new ProductsModel({...value, vendor_id: userID});
                await product.save();

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Product Saved Successfully!'
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        case "GET":
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const category_id = req.query.category_id;
                const skip = (page - 1) * limit;

                const products = await ProductsModel.find({
                    category_id: new ObjectId(category_id)
                })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 })
                .populate('category_id', 'name') 
                .populate('vendor_id', 'fullName address phone.value isApproved');

                const total = await ProductsModel.find({}).count();
                const starting = total ? skip + 1 : 0;
                const ending = starting + limit - 1 > total ? total : starting + limit - 1;

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: {
                        data: products,
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