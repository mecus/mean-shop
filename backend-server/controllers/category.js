var Category = require('../models/category.model');

getCategory = function(req,res){

}

postCategory = function(req, res){
    var cat = new Category({
        name: req.body.name,
        department_id: req.body.department_id
    }).save(function(err){
        if(err){
            console.error(err);
        }else{
            res.redirect('/admin/store');
           
        }
    })


}
deleteCategory = function(req, res){
    var queryId = req.params.id;
    Category.remove({_id:queryId}).exec(function(err){
        console.error(err);
        res.redirect('/admin/store');
    })
}

module.exports = {getCategory, postCategory, deleteCategory}