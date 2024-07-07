import express from 'express'
import { createMainCategory, createSubCategory, fetchMainCategories, fetchSubCategories } from '../controllers/categoryController.js';
import { verifyUserAuth } from '../middlewares/authorization.js';
const router = express.Router();

router.post('/add_category' , verifyUserAuth, createMainCategory);

router.post('/add_subcategory' , verifyUserAuth, createSubCategory);

router.get('/main_categories' , verifyUserAuth,  fetchMainCategories);

router.get('/subcategories' ,verifyUserAuth,  fetchSubCategories);

export default router;