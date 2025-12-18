import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { Credentials } from "../Model/Credentials.js"
import OrderDetails from "../Model/OrderDetails.js"

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
  console.log("Fetching")
  const {Email, Password} = req.body;
  const query1 = await Credentials.findOne({ Email: Email})
  const query2 = await Credentials.findOne({  Password: Password })
  const query = await Credentials.findOne({Email: Email,Password: Password })
  // console.log("Login Body req is  ,  and ",query1);
  // console.log("Again Login Body req is ",req.body , " and ",query2);
try{
  if(!query1){
    res.status(401)
   res.send("Invalid Email")
  } else if(!query2){
    res.status(401)
    res.send("Invalid Password")
  }
 else if(Email === "admin" || Password === "admin123"){
    res.status(201);
    res.send("Admin Login Successful");
 }else if(query){
  res.status(200)
  res.send("Successful")
 }
 else {
  res.status(401)
  res.send("Not Available")
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

app.get('/',(req,res)=>{
  res.send("Hello World")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})