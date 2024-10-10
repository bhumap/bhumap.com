import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    min_qty: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    uom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    },
    vendor_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    images: [
        {
            secure_url:{ type: String },
            public_id:{ type: String },
        }
    ],
    status: {
        type: String,
        enum: ["drafted", "publish", "delete", "inactive"],
        default: "drafted",
        required: true
    }
}, { timestamps: true});

const Products = mongoose.model?.Products || mongoose.model("Products", productsSchema);

export default Products; 