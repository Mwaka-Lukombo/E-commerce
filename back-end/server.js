import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/db.js';


 connectDB()


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

const __dirname = path.resolve();



// json config

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(cors())

//routes
import routerProduct from './routes/product.router.js';


app.use('/api/products/',routerProduct);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/front-end/dist')));

  app.use("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "front-end","dist","index.html"));
  })
}

app.listen(PORT,()=>{
    console.log("Server started at "+PORT)
})





















