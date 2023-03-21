const { json } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costumer = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    required: false,
  },
  ismanager: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Costumers", costumer);
