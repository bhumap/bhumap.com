import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:true,
  },
  address: {
    type: String,
    required:false,
  },
  username: {
    type: String,
    required:true,
    unique:true,
  },
  userType: {
    type: String,
    required: true,
    default:"Buyer",
    enum:["Admin","Buyer","Seller","Advisor","Vendor"]
  },
  email: {
    value: {
      type: String,
      unique: true,
    },
    isVarified: {
      type: Boolean,
      default:false,
      required:true,
    },
  },
  phone: {
    value: {
      type: String,
      required:true,
      unique: true,
    },
    isVarified: {
      type: Boolean,
      default:false,
      required:true,
    },
  },
  password: {
    type: String,
    required:true,
  },
  photo: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: true,
  },
  pan:{
    type:String
  },
  otp:{
    value:Number,
    exexpirationTime:Date
  },
  referral_code: {
    type: String,
    required:true,
    unique: true
  },
  referred_by: {
    type: String
  },
  wallet: {
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative'],
      get: (value) => (value / 100).toFixed(2),
      set: (value) => Math.round(value * 100),
    },
    status: {
      type: String,
      enum: ["Active", "Deleted"],
      default: "Active",
    },
  }
}, { timestamps: true });

var Users = mongoose.models?.users || mongoose.model("users", userSchema);

export default Users
