import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    Name : String,
    Category : String,
    Price : String
})
const orderSchema = new mongoose.Schema({
  items: [OrderSchema]
});
export const Order = mongoose.model("Order", orderSchema);