const { Schema, model, mongoose } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Number,
        required: true
    }
})

const ProductModel = model('Product', productSchema)
module.exports = ProductModel;