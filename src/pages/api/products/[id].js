import dbConnect from "@/src/backend/config/dbConnect";
import ProductsModel from "@/src/backend/models/products";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import usersModel from "@/src/backend/models/users";
import { StatusCodes } from 'http-status-codes';
import Joi from "joi";
import mongoose from "mongoose";

const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.string().optional(),
    minOrder: Joi.string().min(1).optional(),
    supplier: Joi.string().optional(),
    supplierage: Joi.string().optional(),
    unit: Joi.string().optional(),
    rating: Joi.string().optional(),
    reviews: Joi.string().optional(),
    location: Joi.string().optional(),
    verified: Joi.boolean().optional(),
    category_id: Joi.string().optional(),
    supplierType: Joi.string().optional(),
    images: Joi.array().optional(),
    features: Joi.array().optional(),
    catalog: Joi.string().allow(null, '').optional(),
    status: Joi.string().valid("Drafted", "Published", "Inactive").default("Drafted").required()
});


export default async function handler(req, res) {
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

                console.log(req.query,"::::::::::::::::::::::::::::::");
                const { id } = req.query;

                delete req.body._id;

                const { error, value } = productValidationSchema.validate(req.body, { abortEarly: false });
                    
                if (error) {
                    console.log(error)
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map((err)=>err.message)})
                }

                let product = await ProductsModel.findById(id);
                if (!product) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "Product not found"
                    });
                }

                console.log(value, "::::::::::::::::")

                product = await ProductsModel.findByIdAndUpdate(id, {...value, vendor_id: new ObjectId(userID)}, { new: true });

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    data:product,
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
                // {
                //     title: "",
                //     price: "",
                //     minOrder: "",
                //     supplier: "",
                //     duration: "",
                //     rating: "",
                //     reviews: "",
                //     location: "",
                //     verified: false,
                //     supplierType: "Manufacturer",
                //     category_id: "",
                //     images: [],
                //     status: "Drafted",
                //   }

                const product = await ProductsModel.findById(id, "title price minOrder supplier supplierage unit rating reviews location verified supplierType category_id images status features catalog").populate("category_id");
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