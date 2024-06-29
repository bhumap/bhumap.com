const mongoose = require("mongoose");
const { Schema } = mongoose;


const ListingSchema = new Schema({
  title: {type: String, required: true },
  phone: { type: String},
  center:{
    lat: Number,
    lng: Number,
  },
  description: { type: String },
  minOrder: { type: Number },
  company: { type: String },

  images: [
    {
      secure_url:{ type: String },
      public_id:{ type: String },
      
    }
  ],
  category: { type: String },

  price: { type: String },
  gst: { type: String },
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

const Listing = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);

module.exports = Listing;
