import { Phone } from "lucide-react";
import mongoose from "mongoose";

const MyCart = new mongoose.Schema({
    name : String,
})

const Details = new mongoose.Schema({
    FullName : String,
    Email : String,
    Phone : Number,
    Address : String,
    cart : [MyCart]

})

const Payment =  mongoose.model("Payment",Details)

export default Payment;