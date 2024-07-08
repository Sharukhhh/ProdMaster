import Product from '../models/productSchema.js';
import SubCategory from '../models/subCategorySchema.js'


/*
    DESCRIPTION : To add a product
    path : /api/product/add
*/
export const AddProduct = async (req, res) => {
    try {

        let {productName , price , ram , stock , description, selectedSubCategory , images } =req.body;
        stock = Number(stock);
        ram = String(ram);

        if(!productName || !price || !ram || !stock || !description || !selectedSubCategory || images.length === 0) {
            return res.status(400).json({error: 'Invalid Entries'});
        }
        
        // checking if catgeory exists
        let subCategoryExists = await SubCategory.findOne({_id : selectedSubCategory});

        if(!subCategoryExists){
            return res.status(404).json({error : 'No such subcategories'});
        }

        // saving product
        await Product.create({
            productName,
            price,
            ram,
            stock,
            description,
            subCategory : subCategoryExists._id,
            images 
        });
        return res.status(201).json({message : `${productName} - Product Saved Successfully`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
DESCRIPTION : To Edit a  Product
ROUTE : /api/product/edit/:productId
*/
export const updateProductDetails = async (req, res) => {
    try {

        const productId = req.params.productId;

        let {productName , price , ram , stock , description, selectedSubCategory } =req.body;
        stock = Number(stock);
        ram = String(ram);

        if(!productName || !price || !ram || !stock || !description || !selectedSubCategory ) {
            return res.status(400).json({error: 'Invalid Entries'});
        }
        // checking if catgeory exists
        let subCategoryExists = await SubCategory.findOne({_id : selectedSubCategory});

        if(!subCategoryExists){
            return res.status(404).json({error : 'No such subcategories'});
        }

        // updating the product
        const existingProduct = await Product.findByIdAndUpdate(productId , {
            productName,
            price,
            ram,
            stock,
            description,
            subCategory : subCategoryExists._id,

        } , {new: true});

        if(!existingProduct) {
            return res.status(404).json({error: 'No Such product '});
        }
        return res.status(200).json({message: `Updated ${productName} Successfully`});

    } catch (error) {
        return res.status(500).json({error: 'Server error'});
    }
}



/*
DESCRIPTION : To get all products
ROUTE : /api/product/get
*/
export const fetchProducts = async (req, res) => {
    try {
        // const page = req.query.page || 1;
        // const limit = req.query.limit ||  6;

        const products = await Product.find().sort({createdAt : -1});

        if(!products){
            return res.status(404).json({error : 'Products not found'});
        }
        const totalProducts = await Product.countDocuments();

        return res.status(200).json({message : 'Success' , products});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
DESCRIPTION : To Get details Single Product
ROUTE : /api/product/single/:productId
*/
export const getSingleProductDetails = async (req, res) => {
    try {
        const productId = req.params.productId;

        if(productId){
            const product = await Product.findById(productId).populate('subCategory');

            if(!product){
                return res.status(404).json({error : 'Not product found'});
            }

            const productArray = [product];
            return res.json({message : 'success' , product : productArray});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}