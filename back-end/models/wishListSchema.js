import mongoose from 'mongoose'


const wishListSchema = mongoose.Schema({

    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },

    products: [
        {
            itemId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'products'
            }
        }
    ]

}, {timestamps: true});

const wishListModel = mongoose.model('wishlist' , wishListSchema);

export default wishListModel;