import Wishlist from '../models/wishListSchema.js';
import Product from '../models/productSchema.js';
import User from '../models/usersSchema.js';

/*
    DESCRIPTION: Add or remove from personalised wishlist
    path: /api/list/add
*/
export const toAddorRemoveFromWishlist = async (req, res) => {
    try {
        
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
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}