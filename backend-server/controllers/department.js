var Department = require('../models/department.model');
var Category = require('../models/category.model');

getDept = function(req, res){
    Department.find({}, function(err, dept){
       res.render('department', output = {dept});
    }); 
}
getCatDept = function(req, res){
    
    Department.find({}, function(err, dept){
        Category.find({department_id:req.params.id})
        .exec(function(err, category){
            res.render('department', output = {dept, category, queryId: req.params.id});
        });
    });  
}

postDept = function(req, res){
    // console.log(req.body);
    // validate req body
    var dept = new Department();
    dept.name = req.body.name,
    dept.code = req.body.code

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
deleteDept = function(req, res){
    //Removing all Categories related to the Department
    var bulk = Category.collection.initializeUnorderedBulkOp();
    bulk.find( { department_id:req.params.id } ).remove();
    bulk.execute();

   //Removing the actual Department
    Department.remove({_id:req.params.id}).exec(function(err){
        console.error(err);
        req.flash('deleteMessage', 'Department was successfully Deleted!!');
        res.redirect('/admin/store');
    })
}

module.exports = {getDept, postDept, deleteDept, getCatDept}