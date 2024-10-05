const { default: mongoose } = require("mongoose");

const membershipPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    amount: {
        type: Number,  
        required: true
    },
    notes: {
        type: [String],
        required: true
    },
    valid_tiil_days: {
        type: String
    }
}, { timestamps: true });  

const MembershipPackage = mongoose.models?.membershippackages || mongoose.model("membershippackages", membershipPackageSchema);

export default MembershipPackage;