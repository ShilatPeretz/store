const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  price: {
    type: Double,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  stock: {
    type: Integer,
    require: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
