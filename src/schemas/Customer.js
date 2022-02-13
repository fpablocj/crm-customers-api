const { Schema, model } = require("mongoose");
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  enterprise: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

module.exports = model("Customer", CustomerSchema, "Customers");