import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';


const router = express.Router();

import { getProducts, createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';

router.get('/', getProducts);
router.post('/',createProduct)
router.delete('/:id', deleteProduct);
router.put('/:id',updateProduct);




export default router;










