import dbConnect from "@/src/backend/config/dbConnect";
import ProductsModel from "@/src/backend/models/products";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import usersModel from "@/src/backend/models/users";
import { StatusCodes } from 'http-status-codes';
import Joi from "joi";

const productValidationSchema = Joi.object({
    name: Joi.string().required(),
    min_qty: Joi.number().min(1).required(),
    price: Joi.number().positive().required(),
    uom: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    category_id: Joi.string().hex().length(24).required(),
    images: Joi.array().items(
        Joi.object({
            _id: Joi.string(),
            secure_url: Joi.string().uri().required(),
            public_id: Joi.string().required()
        })
    ).optional(),
    status: Joi.string().valid("drafted", "publish", "delete", "inactive").default("drafted").required()
});

export default async function handler(req, res) {
    console.log('2');
    await dbConnect();
    
    switch(req.method) {
        case "PUT":
            try {
                let token = req.cookies.AccessToken || "";
                let userID = await JWTVerify(token);

                if (!userID) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({
                        success: false,
                        message: "Unauthorized Action!",
                    });
                }

                const { id } = req.query;
                const { error, value } = productValidationSchema.validate(req.body, { abortEarly: false });
                    
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                const product = await ProductsModel.findById(id);
                if (!product) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "Product not found"
                    });
                }

                await ProductsModel.findByIdAndUpdate(id, {...value, vendor_id: new ObjectId(userID)}, { new: true });

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Product Updated Successfully!'
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        case "GET":
            try {
                let token = req.cookies.AccessToken || "";
                let userID = await JWTVerify(token);

                if (!userID) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({
                        success: false,
                        message: "Unauthorized Action!",
                    });
                }

                const { id } = req.query;

                const product = await ProductsModel.findById(id, "-vendor_id -createdAt -updatedAt -__v");
                if (!product) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "Product not found"
                    });
                }

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Product fetch Successfully!',
                    data: product
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