import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    membership_package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "membership_packages",  
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",  
        required: true
    },
    image: {
        type: String,  
        required: false
    },
    utr_number: {
        type: String,
        required: true
    },
    expire_date: {
        type: Date,  
        required: true
    },
    activation_date: {
        type: Date,  
        required: true
    },
    term_and_condition: {
        type: Boolean,  
        required: false,
        default: true
    },
    status: {
        type: String,  
        required: true,
        enum: ["Active", "Expired", "Pending"],  
        default: "Pending"
    }
}, { timestamps: true });  


const Membership = mongoose.models?.memberships || mongoose.model("memberships", membershipSchema);

export default Membership;