import express from 'express'
import { fetchWishListedItems, toAddorRemoveFromWishlist } from '../controllers/wishListController.js';
import { verifyUserAuth } from '../middlewares/authorization.js';
const router = express.Router();

router.patch('/toggle/:productId' , verifyUserAuth, toAddorRemoveFromWishlist)

router.get('/get' , verifyUserAuth, fetchWishListedItems);

export default router;