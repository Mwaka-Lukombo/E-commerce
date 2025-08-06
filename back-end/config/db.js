import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async ()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDb Connected: ${conn.connection.host}`)
      return conn;
    }catch(err){
     console.log(`Error: ${err.message}`);
     process.exit(1); //1 code means exit with failuir, 
    }
}

















