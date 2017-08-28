var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var catModel = new Schema({
    name: String,
    department_id: String
})

var Category = mongoose.model('Category', catModel);
module.exports = Category;
