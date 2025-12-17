/* eslint-disable no-unreachable */
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { Credentials } from "./Model/Credentials.js"
import setUser from "./Service/auth.js"
import OrderDetails from "./Model/OrderDetails.js"

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
  const query1 = await Credentials.findOne({ Username: Username})
  const query2 = await Credentials.findOne({  Password: Password })
  console.log("Login Body req is  ,  and ",query1);
  console.log("Again Login Body req is ",req.body , " and ",query2);
try{
 if(Username === "admin" || Password === "admin123"){
    res.status(201);
    res.send("Admin Login Successful");
 }
  // }else if(query1){  
  //   console.log("User found: ",query);
  //   const token = setUser(query);
  //    if (!token) return res.status(500).send("Token generation failed");
  //   res.cookie("uid", token)
  //   res.send("Login Successful");
  // }
   else {
    res.status(401);
    res.send("Login not Successful");
  }  } catch (error) {
    res.send(`Login not Successful ${error}`);
  } 
})

app.post("/orders",(req,res)=>{
  console.log("Hello World",req.body.data)
  const query = new OrderDetails(req.body.data)
  query.save()
  console.log("Data has been saved")
  res.status(200)
  res.send("Successful")
})

app.get('/pakistan',(req,res)=>{
  res.send("Hello World")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})