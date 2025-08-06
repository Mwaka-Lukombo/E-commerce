import mongoose from 'mongoose';

import Product from "../models/product.model.js";

export const getProducts = async (req,res)=>{
     try{
        const products = await Product.find({});

        return res.status(200).json({success:true,data:products})
     }catch(err){
         console.log("error in fetching products",error.message)
     }
}

export const createProduct =  async(req,res)=>{
    
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please provide all fields"})
    }

    const newProduct = new Product(product);

    try{
     await newProduct.save();
     res.status(201).json({success:true,data:newProduct});
    }catch(err){
      console.error(err.message)
      res.status(500).json({sucess:false,message:"Server error"})
    }
}



export const deleteProduct = async(req,res)=>{
     const {id} = req.params; 

     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({success:false,message:"Invalid product Id"})
      }
        
       try{
         await Product.findByIdAndDelete(new mongoose.Types.ObjectId(id));
          res.status(200).json({success:true, message:"Product delected"})
       }catch(err){
         console.error(err)

         res.status(404).json({success:false, message:"Product not found!"})
       }
}



export const updateProduct =  async (req,res)=>{
    const {id} = req.params;

       const product = req.body
     

      if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({success:false,message:"Invalid product Id"})
      }

    
         try{
           const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});

           res.status(200).json({success:true,data:updateProduct, message:"Product updated"});
         }catch(error){
            res.status(500).json({sucess:false, message:'Server Error'})
         }

        }













