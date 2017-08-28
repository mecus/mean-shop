var ObjectId = require('mongodb').ObjectID;
var Category = require('../models/category.model');
var Product = require('../models/product.model');
var SubCategory = require('../models/sub-category.model');
var Department  = require('../models/department.model');

getCategory = function(req, res, next){
    var queryId = req.params.id;
    Category.find({department_id:ObjectId(queryId)})
        .exec(function(err, category){
            Department.findOne({_id: ObjectId(queryId)}).then(function(dept){
                console.log(dept);
                res.render('category', {category, queryId, department:dept});
            }).catch(function(error){
                console.log(error);
            })
        })
    
}

postCategory = function(req, res, next){
    var cat = new Category({
        name: req.body.name,
        department_id: req.body.department_id
    }).save(function(err){
        if(err){
            console.error(err);
        }else{
            res.redirect('/admin/category/'+req.body.department_id);
           
        }
    })


}
deleteCategory = function(req, res, next){
    var queryId = req.params.id;

    // Remove all Products associated to the department
    var prodbulk = Product.collection.initializeUnorderedBulkOp();
    prodbulk.find({category_id: ObjectId(queryId)}).remove();
    prodbulk.execute();

    //Removing Sub-Category linked to the category
    var subCatbulk = SubCategory.collection.initializeUnorderedBulkOp();
    prodbulk.find({category_id: ObjectId(queryId)}).remove();
    prodbulk.execute();


    //Removing the actual Category
    Category.remove({_id: ObjectId(queryId)}).exec(function(err){
        console.error(err);
        res.redirect('/admin/store');
    })
}

module.exports = {getCategory, postCategory, deleteCategory}