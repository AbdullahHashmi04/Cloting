/* eslint-disable no-unreachable */
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { Credentials } from "./Model/Credentials.js"
import { Order } from "./Model/Order.js"
import setUser from "./Service/auth.js"

await mongoose.connect("mongodb://localhost:27017/Credentials")

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.post("/signup",(req,res)=>{
  console.log("Body req is ",req.body.item);
  const product = new Credentials(req.body.item)
  product.save()
  console.log("User signed up: ",product);
  res.send("Signup Successful")
})

app.post("/login", async (req, res) => {
  const {Username, Password} = req.body;
  const query = await Credentials.findOne({ Username: Username, Password: Password })
  console.log("Login Body req is ",req.body);
try{
 if(Username === "admin" || Password === "admin123"){
    res.status(201);
    res.send("Admin Login Successful");
  }else if(query){  
    console.log("User found: ",query);
    const token = setUser(query);
     if (!token) return res.status(500).send("Token generation failed");
    res.cookie("uid", token)
    res.send("Login Successful");
  }
   else {
    res.status(401);
    res.send("Login not Successful");
  }  } catch (error) {
    res.send(`Login not Successful ${error}`);
  } 
})

app.post("/order",(req,res)=>{
  // console.log("Order Body req is ",req.body.item);
  const order = new Order(req.body.item)
  order.save()
  res.status(201)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})