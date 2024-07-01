const mongoose = require("mongoose");

mongoose.models = {};
mongoose.modelSchemas = {};

const referenceSchema = new mongoose.Schema({
  Ref_ID: {
    type: String,
    required: true,
  },
  Referral_Name: {
    type: String,
    required: true,
  },
  Package: {
    type: String,
    required: true,
  },
  Commission: {
    type: String,
    required: true,
  },
  Payment_date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("Reference", referenceSchema);
