
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        min: [0, 'Balance cannot be negative'],
        get: (value) => (value / 100).toFixed(2), 
        set: (value) => Math.round(value * 100), 
    },
    utr_number: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["credit", "debit", "recharge"],
        default: "recharge"
    },
    description: {
        type: String,
        default: '',
    },
    images: [
        {
            secure_url:{ type: String },
            public_id:{ type: String },
        }
    ],
    by_admin: {
        amount: {
            type: Number,
            get: (value) => (value / 100).toFixed(2), 
            set: (value) => Math.round(value * 100), 
        },
        is_processed: {
            type: Boolean,
            default: false,
        },
    },
    transaction_date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, toJSON: {getters: true}, toObject: {getters: true} });

const Transactions = mongoose.models?.Transactions || mongoose.model("Transactions", transactionSchema);

export default Transactions;