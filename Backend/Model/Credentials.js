import mongoose from "mongoose"

const SignupSchema = new mongoose.Schema({
    Username : String,
    Email : String,
    Password : String
})

export const Credentials = mongoose.model("Credentials",SignupSchema)