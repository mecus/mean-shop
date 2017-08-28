var SubCategory = require('../models/sub-category.model');
var Category    = require('../models/category.model');
var Product = require('../models/product.model');

getSubCategory = function(req, res, next){
    var id = req.params.id;
    Category.findOne({_id:id}, function(err, cat){
        if(err){return next(err);}
        SubCategory.find({category_id: cat.id}, function(err, catData){
            if(err){return next(err);}
            res.render('sub-cat', {category: cat, catData});
        })
    });
    
}

postSubCategory = function(req, res){
    var reqId = req.body.category_id;
    var cat = new SubCategory({
        name: req.body.name,
        department_id: req.body.department_id,
        category_id: req.body.category_id
    }).save(function(err){
        if(err){
            console.error(err);
        }else{
            res.redirect('/admin/subcat/add/'+reqId);
           
        }
    })


}
deleteSubCategory = function(req, res){
    var queryId = req.params.id;

     // Remove all Products associated to the department
    var prodbulk = Product.collection.initializeUnorderedBulkOp();
    prodbulk.find({subcategory_id:queryId}).remove();
    prodbulk.execute();

    //Remove Sub-Category
    SubCategory.remove({_id:queryId}).exec(function(err){
        console.error(err);
        res.redirect('/admin/store');
    })
}

module.exports = {getSubCategory, postSubCategory, deleteSubCategory}