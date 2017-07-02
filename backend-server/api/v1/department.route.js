const Department  = require('../../models/department.model');


getDepartment = function(req, res, next){
    Department.find({}).exec(function(err, department){
        res.json(department);
    });
}

module.exports = getDepartment;