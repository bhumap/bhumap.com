const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertiesSchema = new Schema({
  title: {type: String, required: true },
  center:{
    lat: Number,
    lng: Number,
  },
  postType: { type: String },
  description: { type: String },
  features: [{ type: String }],
  images: [
    {
      secure_url:{ type: String },
      public_id:{ type: String },
    }
  ],
  purpose: { type: String },
  propertyType: { type: String },
  residentialSubType: { type: String },
  price: { type: String },
  video: { type: String},
  address: {
    line1: { type: String },
    line2: { type: String },
    line3: { type: String },
    cityTown: { type: String },
    district: { type: String },
    zipCode: { type: String },
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  status:{
    type:String,
    enum:["Drafted","Published"],
    default:"Drafted",
    required:true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
},{timestamps:true});

var PropertiesModel = mongoose.models?.properties || mongoose.model("properties", propertiesSchema);
export default PropertiesModel;
