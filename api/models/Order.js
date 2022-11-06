const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: Object, required: true },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String, required: true },
    city: { type: String, required: true },
    governorate: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
