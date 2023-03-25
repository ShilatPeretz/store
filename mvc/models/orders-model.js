const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  ordernum: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  products: {
    type: JSON,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
