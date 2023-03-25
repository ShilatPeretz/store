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
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
