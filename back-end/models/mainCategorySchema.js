import mongoose from 'mongoose';

//Schema for main category
const categorySchema = mongoose.Schema({

    mainCategory : {
        type : String,
        required : true
    }

}, {timestamps: true});

const categoryModel = mongoose.model('main categories' , categorySchema);

export default categoryModel;