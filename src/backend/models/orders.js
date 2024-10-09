const { default: mongoose } = require("mongoose");

const ordersSchema = new mongoose.Schema({
    subOrders: [
        {
          vendor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
          },
          status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Delivered"],
            default: "Pending",
          },
          carts: [
            {
              product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
              },
              quantity: {
                type: Number,
                required: true,
                min: 1,
              },
              price: {
                type: Number,
                required: true,
                min: 0,
              },
            },
          ],
          gst: {
            type: Number,
          },
          shipping: {
            type: Number,
          },
          subTotal: {
            type: Number,
          },
          total: {
            type: Number,
          },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
        enum: ["online", "cashOnDelivery"],
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });

const Orders = mongoose.models?.orders || mongoose.model("orders", ordersSchema);

export default Orders;