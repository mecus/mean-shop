var mongoose =  require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

//Creating Article Schema
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: String,
    code: String,
    price: SchemaTypes.Double,
    old_price: SchemaTypes.Double,
    imageUrl: String,
    photo_id: String,
    offer: String,
    brand: String,
    sponsored: String,
    recommend: String,
    category: {
        type: String
    },
    department_id: String,
    category_id: String,
    subcategory_id: String,
    stock: Number,
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
