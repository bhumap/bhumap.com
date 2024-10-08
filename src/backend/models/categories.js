
const { default: mongoose } = require("mongoose");

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

const Categories = mongoose.models?.categories || mongoose.model("categories", categoriesSchema);

export default Categories;