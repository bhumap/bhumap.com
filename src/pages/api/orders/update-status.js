import dbConnect from "@/src/backend/config/dbConnect";
import OrdersModel from "@/models/orders";
const { ObjectId } = require("mongoose").Types;
import { JWTVerify } from "@/helpers/jwt";
import { StatusCodes } from 'http-status-codes';

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

    try {
        const orderId = req.body.orderId;
        const subOrderId = req.body.subOrderId;
        const newStatus = req.body.newStatus;
    
        const order = await OrdersModel.findById(orderId);
        
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Not Found!",
            });
        }

        const subOrder = order.subOrders.find((v) => v._id == subOrderId);

        if (!subOrder) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Not Found!",
            });
        }
    
        let data = await OrdersModel.findOneAndUpdate(
          {
            _id: new ObjectId(orderId),
            "subOrders._id": new ObjectId(subOrderId),
          },
          {
            $set: {
              "subOrders.$.status": newStatus,
            },
          },
          { new: true }
        );

        res.json({
            success: true,
            message: "Status Updated Successfully!",
            data: data,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: true,
            message: error.message,
        });
    }
    
}