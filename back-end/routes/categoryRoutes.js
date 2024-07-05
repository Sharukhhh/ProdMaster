import express from 'express'
import { createMainCategory, createSubCategory, fetchMainCategories, fetchSubCategories } from '../controllers/categoryController';
const router = express.Router();

router.post('/add_category' , createMainCategory);

router.post('/add_subcategory' , createSubCategory);

router.get('/main_categories' , fetchMainCategories);

router.get('/subcategories' , fetchSubCategories);

export default router;