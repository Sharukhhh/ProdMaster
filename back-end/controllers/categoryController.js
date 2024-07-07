import Category from '../models/mainCategorySchema.js'
import SubCategory from '../models/subCategorySchema.js'

/*
    DESCRIPTION : to Add Main category
    path : /api/category/add_category
*/
export const createMainCategory = async (req, res) => {
    try {
        
        console.log(req.body)
        const { mainCategory} = req.body;

        if(mainCategory){

            let isCategoryExists = await Category.findOne({mainCategory});

            if(isCategoryExists){
                return res.status(409).json({error : 'Category Already Exists'});
            }

            await Category.create({
                mainCategory 
            });

            return res.status(201).json({message : `${mainCategory} - Category Added`});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    DESCRIPTION : To fetch all Main Categories
    path : /api/category/main_categories
*/
export const fetchMainCategories = async (req, res) => {
    try {
        
        const categories = await Category.find();

        if(!categories){
            return res.status(404).json({error : 'No main categories'})
        }

        return res.json({message : 'Success' , categories});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    DESCRIPTION : Add Sub Category
    path : /api/category/add_subcategory
*/
export const createSubCategory = async (req, res) => {
    try {        
        const { subCategory,  selectedMainCategory } = req.body;

        if(subCategory && selectedMainCategory){

            let subCategoryExists = await SubCategory.findOne({subcategoryName : subCategory});

            if(subCategoryExists){
                return res.status(409).json({error : 'Category Already Exists'});
            }

            const mainCategoryExists = await Category.findOne({_id : selectedMainCategory});

            if(!mainCategoryExists){
                return res.status(404).json({error : 'Main Category Not found'});
            }

            await SubCategory.create({
                mainCategory : mainCategoryExists._id,
                subcategoryName : subCategory
            })

            return res.status(201).json({message : ` ${subCategory} - Sub Category Added`});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    DESCRIPTION : Function to show sub categories
    path : /api/category/subcategories
*/
export const fetchSubCategories = async (req, res) => {
    try {

        const requiredCategoryName = 'Laptops';

        const mainCategory = await Category.findOne({mainCategory : requiredCategoryName});

        if(!mainCategory){
            return res.status(404).json({error : 'Not found'});
        }

        const subcategories = await SubCategory.find({mainCategory : mainCategory._id });

        if(!subcategories){
            return res.status(404).json({error : 'No sub categories found'})
        }

        return res.json({message : 'success' , subcategories});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'});
    }
}