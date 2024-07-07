import express from 'express';
import { AddProduct, fetchProducts, getSingleProductDetails, updateProductDetails } from '../controllers/productController.js';
const router = express.Router();

router.post('/add' , AddProduct);

router.get('/get' , fetchProducts);

router.get('/single/:productId' , getSingleProductDetails);

router.put('/edit/:productId' , updateProductDetails);


export default router;