import mongoose from 'mongoose';


// Schema for creating sub categories

const subCategorySchema = mongoose.Schema({

    mainCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'main categories'
    },

    subcategoryName : {
        type : String,
        required : true
    },

} , {timestamps: true});

const subCategoryModel = mongoose.model('sub categories' , subCategorySchema );

export default subCategoryModel;