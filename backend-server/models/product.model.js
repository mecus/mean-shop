var mongoose =  require('mongoose');
//Creating Article Schema
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: String,
    code: String,
    price: String,
    imageUrl: String,
    category: {
        type: Array
    },
    catCode: String,
    stock: Number,
    department: String,
    description: {
        detail: String,
        size: String,
        origin: String,
    },
    nutrition: {
        energy: String,
        fat: String,
        saturates: String,
        salt: String
    },
    publish: String
})
var Product;
module.exports = Product = mongoose.model('Product', productSchema); 
