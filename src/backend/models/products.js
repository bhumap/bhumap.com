import mongoose from "mongoose";

// {
//     title:
//       "Tuya Control 120V WiFi Smart Plug, Alexa & Google Assistant Compatible, Remote Control, Timer, Energy Monitoring, No Hub Required, Easy Setup.",
//     price: "708.00",
//     minOrder: "100",
//     supplier: "Shenzhen Tuya Smart Technology Co., Ltd.",
//     duration: "2 years",
//     rating: "4.9",
//     reviews: "2",
//     location: "Ahemadabad, India",
//     verified: true,
//     supplierType:"Dealer",
//     images:[
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//       "https://cdn.pixabay.com/photo/2016/01/29/03/22/circuit-breakers-1167327_1280.jpg",
//     ]
// }

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:null
    },
    minOrder:{
        type:Number,
        default:null
    },
    supplier:{
        type:String,
        default:null
    },
    duration:{
        type:String,
        default:null
    },
    rating:{
        type:Number,
        default:null
    },
    reviews:{
        type:Number,
        default:null
    },
    location:{
        type:String,
        default:null
    },
    verified:{
        type:Boolean,
        default:null
    },
    supplierType:{
        type:String,
        default:null,
        enum:["Manufacturer","Wholesaler","Retailer"]
    },
    images:{
        type:[String],
        default:null
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref:"categories"
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    status:{
        type:String,
        enum:["Drafted","Published","Inactive"],
        default:"Drafted",
        required:true
    }
}, { timestamps: true});

const Products = mongoose.models.products || mongoose.model("products", productsSchema);

export default Products; 