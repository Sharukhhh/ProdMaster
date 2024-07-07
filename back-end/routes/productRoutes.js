import express from 'express';
import { AddProduct, fetchProducts, getSingleProductDetails, updateProductDetails } from '../controllers/productController.js';
import { verifyUserAuth } from '../middlewares/authorization.js';
const router = express.Router();

router.post('/add' ,verifyUserAuth, AddProduct);

router.get('/get' ,verifyUserAuth, fetchProducts);

router.get('/single/:productId' ,verifyUserAuth, getSingleProductDetails);

router.put('/edit/:productId' ,verifyUserAuth, updateProductDetails);


export default router;