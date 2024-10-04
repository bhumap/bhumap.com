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
    }
}, { timestamps: true });  

const MembershipPackage = mongoose.models?.membership_packages || mongoose.model("membershipPackages", membershipPackageSchema);

export default MembershipPackage;