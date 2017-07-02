var Department = require('../models/department.model');
var Category = require('../models/category.model');
var Product = require('../models/product.model');
var SubCategory = require('../models/sub-category.model');

getDept = function(req, res){
    Department.find({}, function(err, dept){
        
        res.render('department', output = {dept});
        
    }); 
}
getCatDept = function(req, res){
    var id = req.params.id;
    Department.find({}, function(err, dept){
        Category.find({department_id:id})
        .exec(function(err, category){
            Product.find({deptId: id}, function(err, products){
                res.render('department', output = {dept, category, products, queryId: req.params.id});
            })
        });
    });  
}

postDept = function(req, res){
    // console.log(req.body);
    // validate req body
    var dept = new Department();
    dept.name = req.body.name,
    dept.code = req.body.code,
    dept.selected = false

    dept.save(function(err){
        if(err){
            console.error(err);
            req.flash('errorMessage', 'OPs! Something went wrong,  Department was not Saved?');
        }else{
            req.flash('successMessage', 'Department was successfully Saved!!');
            res.redirect('/admin/store');
        }
    })  
}
editDept = function(req, res, next){
    var queryId = req.params.id;
    
    Department.find({}, function(err, dept){
        Department.findOne({_id:queryId}, function(err, oneDept){
            res.render('department', output = {dept, oneDept});
        })
        
    })  
}

updateDept = function(req, res, next){
    var queryId = req.params.id;
    var updateDep = {
        name: req.body.name,
        code: req.body.code,
        selected: false
    }
    Department.update({_id:queryId}, updateDep, function(err){
        if(err){return next(err);}
        res.redirect('/admin/store');
    });

}
deleteDept = function(req, res, next){
    var queryId = req.params.id;
    // Remove all Products associated to the department
    var prodbulk = Product.collection.initializeUnorderedBulkOp();
    prodbulk.find({department_id:queryId}).remove();
    prodbulk.execute();

    //Removing Sub-Category
    var subCatbulk = SubCategory.collection.initializeUnorderedBulkOp();
    prodbulk.find({department_id:queryId}).remove();
    prodbulk.execute();

    //Removing all Categories related to the Department
    var bulk = Category.collection.initializeUnorderedBulkOp();
    bulk.find( { department_id:queryId } ).remove();
    bulk.execute();

   //Removing the actual Department
    Department.remove({_id:queryId}).exec(function(err){
        console.error(err);
        req.flash('deleteMessage', 'Department was successfully Deleted!!');
        res.redirect('/admin/store');
    })
}

module.exports = {getDept, postDept, deleteDept, getCatDept, editDept, updateDept}