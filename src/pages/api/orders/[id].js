import dbConnect from "@/src/backend/config/dbConnect";
import OrdersModel from "@/src/backend/models/orders";
import UsersModel from "@/src/backend/models/users";
const { ObjectId } = require("mongoose").Types;
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
import { listenerCount } from "@/src/backend/models/listing";

export default async function(req, res) {
    await dbConnect();

    let token = req.cookies.AccessToken || "";
    let userID = await JWTVerify(token);

    if (!userID) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized Action!",
        });
    }

    switch(req.method) {
        case "PUT": 
            try {
                let user = await UsersModel.findById(userID);

                if (!user || user.userType !== "Admin") {
                    return res.status(StatusCodes.BAD_GATEWAY).json({
                        success: false,
                        message: "Unauthorized Action!",
                    });
                }

                const {id: orderId} = req.query;
                const payment_status = req.body.payment_status;
                
                const order = await OrdersModel.findById(orderId);
        
                if (!order) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "Not Found!",
                    });
                }

                let data = await OrdersModel.findOneAndUpdate(
                    {
                      _id: new ObjectId(orderId)
                    },
                    {
                      $set: {
                        "payment_status": payment_status,
                      },
                    },
                    { new: true }
                  );
          
                  res.json({
                      success: true,
                      message: "Status Updated Successfully!",
                      data: data,
                  });

                break;
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: true,
                    message: error.message,
                });
            }
            break;
        case "GET":
            try {
                const { id } = req.query;
                const order = await OrdersModel.findById(id)
                        .populate({ path: "subOrders.vendor_id", model: UsersModel, select: 'fullName address userType' })
                        .populate({ path: "user", model: UsersModel, select: 'fullName address userType phone' })
                        .populate({ path: "subOrders.carts.product_id", model: ProductsModel })
                        .sort({createdAt:-1});
                        
                if (!order) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: "Order not found"
                    });
                }

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: 'Order fetch Successfully!',
                    data: order
                });
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: true,
                    message: error.message,
                });
            }
    }
}