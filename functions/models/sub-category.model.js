var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var subCatModel = new Schema({
    name: String,
    department_id: String,
    category_id: String,
    types_$: String
})

var subCategory = mongoose.model('subCategory', subCatModel);
module.exports = subCategory;
