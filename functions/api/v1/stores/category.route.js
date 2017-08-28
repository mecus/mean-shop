const Category  = require('../../../models/category.model');
const Product   = require('../../../models/product.model');

getCategory = function(req, res, next){
    var paramId = req.params.id;
    Category.find({department_id: paramId}).exec(function(err, category){
        if(err){return next(err);}
        //need to change the query params
        Product.find({department_id: paramId}, function(err, products){
            if(err){return next(err);}
            res.json({category, products});
        })
    });
}

module.exports = getCategory;