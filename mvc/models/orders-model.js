const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
