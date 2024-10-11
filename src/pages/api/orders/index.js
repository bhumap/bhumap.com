import dbConnect from "@/src/backend/config/dbConnect";
import OrdersModel from "@/src/backend/models/orders";
import UsersModel from "@/src/backend/models/users";
import ProductsModel from "@/src/backend/models/products";
import { JWTVerify } from "@/src/backend/helpers/jwt";
import { StatusCodes } from 'http-status-codes';
import Joi from "joi";

export default async function(req, res) {
    await dbConnect();
    
    var token = req.cookies.AccessToken || "";
    var userID = await JWTVerify(token);

    if (!userID) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
            success: false,
            message: "Unauthorized Action!",
        });
    }

    switch(req.method) {
        case "GET":
            try {
                var user = await UsersModel.findById(userID);
        
                var orders;
        
                if (user.userType == "Vendor") {
                  orders = await OrdersModel.aggregate([
                    {
                      $unwind: "$subOrders",
                    },
                    {
                      $match: {
                        "subOrders.vendor_id": new ObjectId(userID),
                      },
                    },
                    {
                      $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                      },
                    },
                    {
                      $unwind: "$user",
                    },
                    {
                      $unwind: "$subOrders.carts",
                    },
                    {
                      $lookup: {
                        from: "products",
                        localField: "subOrders.carts.product_id",
                        foreignField: "_id",
                        as: "subOrders.carts.product_id",
                      },
                    },
                    {
                      $unwind: "$subOrders.carts.product_id",
                    },
                    {
                      $group: {
                        _id: "$_id",
                        user: { $first: "$user" },
                        carts: {
                          $push: {
                            product_id: "$subOrders.carts.product_id",
                            quantity: "$subOrders.carts.quantity",
                            price: "$subOrders.carts.price",
                          },
                        },
                        totalCarts: { $sum: "$subOrders.carts.quantity" },
                        status: { $first: "$subOrders.status" },
                        subOrderId: { $first: "$subOrders._id" },
                        orderId: { $first: "$orderId" },
                        createdAt: { $first: "$createdAt" },
                        shipping: { $first: "$subOrders.shipping" },
                        total: { $first: "$subOrders.total" },
                        subTotal: { $first: "$subOrders.subTotal" },
                        gst: { $first: "$subOrders.gst" },
                      },
                    },
                    {
                      $project: {
                        user: {
                          _id: "$user._id",
                          fullName: "$user.fullName",
                          phone: "$user.phone",
                          photo: "$user.photo",
                        },
                        carts: 1,
                        totalCarts: 1,
                        subOrderId: 1,
                        status: 1,
                        createdAt: 1,
                        orderId: 1,
                        shipping: 1,
                        subTotal: 1,
                        gst: 1,
                        total: 1,
                      },
                    },
                    {
                      $sort:{
                        createdAt:-1
                      }
                    }
                  ]);
                } else {
                  orders = await OrdersModel.find({ user: new ObjectId(userID) })
                    .populate({ path: "subOrders.vendor_id", model: UsersModel })
                    .populate({ path: "subOrders.carts.product_id", model: ProductsModel })
                    .sort({createdAt:-1})
        
                  orders = orders.map((order) => {
                    let orderSubTotal = 0;
                    let shipping = 0;
                    let gst = 0;
        
                    let totalDishes = 0;
        
                    order.subOrders = order.subOrders.map((subOrder) => {
                      let subTotal = 0;
                      let subCarts = 0;
        
                      subOrder.carts.map((cart) => {
                        subTotal = subTotal + cart.quantity * cart.price;
                        subCarts = subCarts + cart.quantity;
                      });
                      
                      subOrder._doc.subTotal = subTotal;
                      subOrder._doc.subCarts = subCarts;
        
                      if((subOrder.status != "Cancelled") && (subOrder.status != "Rejected")){
                        orderSubTotal = orderSubTotal + subOrder.subTotal
                        shipping = shipping + subOrder.shipping
                        gst = gst + subOrder.gst
                        totalDishes = totalDishes + subDishes;
                      }
        
                      return subOrder;
                    });
        
                    order._doc.shipping = shipping;
                    order._doc.subTotal = orderSubTotal;
                    order._doc.gst = gst;
                    order._doc.total = shipping + orderSubTotal + gst;
                    order._doc.totalDishes = totalDishes;
                    
                    return order;
                  });
                }
        
                res.status(200).json({
                  success: true,
                  message: {
                    data: orders,
                  },
                });
              } catch (error) {
                console.log(error);
                res.status(500).json({
                  success: false,
                  message: error.message,
                });
              }
            break;
        case "POST":
            try {
                let subOrders = new Map();

                req.body.carts.forEach((v) => {
                    if (subOrders.has(v.vendor_id)) {
                        subOrders.get(v.vendor_id).carts.push({
                            product_id: v.product_id,
                            price: v.price,
                            quantity: v.quantity,
                        });
                    } else {
                        subOrders.set(v.vendor_id, {
                            vendor_id: v.vendor_id,
                            carts: [{ product_id: v.product_id, price: v.price, quantity: v.quantity }],
                        });
                    }
                });

                subOrders = Array.from(subOrders.values());

                // calcation
                subOrders = subOrders.map((order,i)=>{
                    let subTotal = 0
                    order.carts.map((cart)=>{
                        subTotal = subTotal + (cart.price * cart.quantity)
                    })
                    order.gst = Math.ceil(process.env.NEXT_PUBLIC_GST_PERCENTAGE * subTotal) 
                    order.shipping = parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST)
                    order.subTotal = subTotal
                    order.total = subTotal + order.shipping + order.gst
                    return order
                });
        
        
                // Function to generate a random string of given length with letters from the alphabet
                function generateRandomLetters(length) {
                    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    let result = "";
                    for (let i = 0; i < length; i++) {
                    result += characters.charAt(
                        Math.floor(Math.random() * characters.length)
                    );
                    }
                    return result;
                }
        
                // Function to generate a specific ID with three letters followed by three digits
                function generateSpecificId() {
                    const letters = generateRandomLetters(3);
                    const digits = Math.floor(100 + Math.random() * 900);
                    return `${letters}${digits}`;
                }
                
                const specificId = generateSpecificId();
        
                await OrdersModel.create({
                    ...req.body,
                    subOrders,
                    user: userID,
                    orderId: specificId,
                });

                res.status(201).json({
                    success: true,
                    message: "Order Placed Successfully!",
                });
            } catch (error) {
                if (err.code === 11000) {
                    return res.status(StatusCodes.CONFLICT).json({
                      success: false,
                      message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
                    });
                  }
          
                  let requiredFildName = Object.keys(err.errors)[0];

                  if (requiredFildName) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                      success: false,
                      message: `${requiredFildName} is required!`,
                    });
                  }
          
                  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: err.message,
                  });
            }
            break;
    }
}