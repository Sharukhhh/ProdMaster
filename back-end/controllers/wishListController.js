import Wishlist from '../models/wishListSchema.js';
import Product from '../models/productSchema.js';
import User from '../models/usersSchema.js';

/*
    DESCRIPTION: Add or remove from personalised wishlist
    path: /api/list/toggle/:productId
*/
export const toAddorRemoveFromWishlist = async (req, res) => {
    try {
        console.log('here');
        const productId = req.params.productId;
        const userId = req.user.userId;

        console.log(productId , userId)

        let wishlist = await Wishlist.findOne({userId});
        if(!wishlist) {
            wishlist = new Wishlist({userId , products : []});
        }

        const productIndex = wishlist.products.findIndex((item) => item.itemId.toString() === productId);

        if(productIndex === -1) {
            wishlist.products.push({itemId: productId});
            await wishlist.save();
            return res.status(201).json({message: `Product Added To Wishlist`});

        } else {
            wishlist.products.splice(productIndex , 1);
            await wishlist.save();
            res.status(200).json({message: 'Product Removed from Wishlist'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    DESCRIPTION: get saved wishlist items
    path: /api/list/get
*/
export const fetchWishListedItems = async (req, res) => {
    try {
        const userId = req.user.userId;

        const products = await Wishlist.findOne({userId}).populate('products.itemId');
        if(!products) {
            return res.status(404).json({error: 'Item not found'});
        }
        return res.status(200).json({message: 'success' , products});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}