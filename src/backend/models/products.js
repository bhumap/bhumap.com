const { default: mongoose } = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        ref:"categories",
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

const products = mongoose.model?.products || mongoose.model("products", productsSchema);

export default products;