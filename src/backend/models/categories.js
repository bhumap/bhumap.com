
import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive", "Deleted"]
    }
});

const Categories = mongoose.models?.Categories || mongoose.model("Categories", categoriesSchema);

export default Categories;