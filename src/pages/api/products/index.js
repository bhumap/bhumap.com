import dbConnect from "@/src/backend/config/dbConnect";
import ProductsModel from "@/src/backend/models/products";
import CategoryModel from "@/src/backend/models/categories";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
const { ObjectId } = require("mongoose").Types;
import usersModel from "@/src/backend/models/users";
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
    status: Joi.string().valid("Drafted", "Published", "Inactive").default("Drafted").required()
});


export default async function (req, res) {
    await dbConnect();

    switch(req.method) {
        case "POST":
            try {
                let token = req.cookies.AccessToken || "";
                let userID = await JWTVerify(token);
            
                if (!userID) {
                    return res.status(StatusCodes.BAD_GATEWAY).json({
                        success: false,
                        message: "Unauthorized Action!",
                    });
                }

                const { error, value } = productValidationSchema.validate(req.body, { abortEarly: false });
                
                if (error) {
                    console.log("===========================================================================>")
                    return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: error.details.map(err => err.message)})
                }

                console.log("::::::::::::::::::", new ObjectId(userID));

                const product = new ProductsModel({...value, vendor_id: new mongoose.Types.ObjectId(userID)});
                await product.save();

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Product Saved Successfully!',
                    data: product
                });
            } catch (error) {
                console.log("===========================================================================>")
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
            break;
        case "GET":
            try {

                let token = req.cookies.AccessToken || "";
                let userID = await JWTVerify(token);

                let user = null;
                if (userID) {
                    user = await usersModel.findById(new ObjectId(userID));
                }

                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;

                const query = {};

                const category_id = req.query.category_id;
                
                if (category_id) {
                    query.category_id = new ObjectId(category_id);
                }

                if (user && user.userType === 'Vendor') {
                    query.vendor_id = new ObjectId(user._id);
                }

                req.query.status && (query.status = req.query.status);

                console.log(query)


                const products = await ProductsModel.find(query)
                    .limit(limit)
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .populate('vendor_id', 'fullName address phone.value isApproved')
                    .populate('category_id', 'name');

                const total = await ProductsModel.countDocuments(query);
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