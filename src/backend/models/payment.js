const mongoose = require('mongoose');

// Clear Mongoose models to avoid overwrite errors (development only)
mongoose.models = {};
mongoose.modelSchemas = {};

// Re-define your Payment model here
const paymentSchema = new mongoose.Schema({
  user_phone: {
    type: String,
    required: true
  },
  Buyer_name: {
    type: String,
    required: true
  },
  Package_Name: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Payment_date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
