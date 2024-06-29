import mongoose from 'mongoose'


const schema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const PropertyViewsModel = mongoose.models["properties-views"] || mongoose.model("properties-views", schema)

export default PropertyViewsModel;
