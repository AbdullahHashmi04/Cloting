import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { Credentials } from "../Model/Credentials.js"
import OrderDetails from "../Model/OrderDetails.js"
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv"
import tryonRoutes from '../Routes/tryonRoutes.js';
import { fileURLToPath } from 'url';
import { dirname , join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const mongoURI = 'mongodb://localhost:27017/Credentials';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


const app = express()
// const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup",(req,res)=>{
  console.log("Body req is ",req.body.item);
  const product = new Credentials(req.body.item)
  product.save()
  console.log("User signed up: ",product);
  res.send("Signup Successful")
})

app.post("/login", async (req, res) => {
  console.log("Fetching")
  const {Username, Password} = req.body;
  const query1 = await Credentials.findOne({ Username: Username})
  const query2 = await Credentials.findOne({  Password: Password })
  const query = await Credentials.findOne({Username: Username,Password: Password })
try{

  if(Username === "admin" || Password === "admin123"){
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
  const date = new Date().toISOString().split('T')[0];
  const query = new OrderDetails({...req.body.data, date});

  console.log("Order received: ",query);
  query.save()
  res.status(200)
  res.send("Successful")
})

app.get('/',(req,res)=>{
  res.send("Hello World")
})


app.get('/getorders',async (req,res)=>{
  const orders = await OrderDetails.find({})
  res.send(orders)
})


app.get('/getcustomers',async (req,res)=>{
  const customers = await Credentials.find({})
  res.send(customers)
})

const upload = multer({ dest: "uploads/" });
app.post("/try", upload.fields([
  { name: "person" },
  { name: "cloth" }
]), async (req, res) => {

  console.log("Control is coming as Ai agent")
  
  const form = new FormData();

  form.append("person", fs.createReadStream(req.files.person[0].path));
  form.append("cloth", fs.createReadStream(req.files.cloth[0].path));


  console.log("Form is ",form)

  const response = await axios.post(
    "http://localhost:8000/tryon/",
    form,
    {
      headers: form.getHeaders(),
      responseType: "arraybuffer"
    }
  );

  res.set("Content-Type", "image/jpeg");
  res.send(response.data);
})
const uploadsDir = join(__dirname, 'uploads', 'tryon');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Virtual Try-On E-commerce API',
    version: '1.0.0',
    endpoints: {
      tryon: '/api/tryon',
      // products: '/api/products',
      // auth: '/api/auth'
    }
  });
});

// API Routes
app.use('/api/tryon', tryonRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File too large',
        message: 'File size should not exceed 10MB' 
      });
    }
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
