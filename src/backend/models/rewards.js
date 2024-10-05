const { default: mongoose } = require("mongoose");

const rewardSchema = new mongoose.Schema({
    referred_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    referred_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    amount_type: {
        type: String,
        required: true,
        default:"percentage",
        enum:["percentage", "cash"]
    },
    reward_amount: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        default:"Pending",
        enum:["Pending", "Success"]
    }
}, { timestamps: true });

const Reward = mongoose.models?.rewards || mongoose.model("rewards", rewardSchema);

export default Reward;