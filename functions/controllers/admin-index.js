var Product = require('../models/product.model');

adminIndex = function(req, res, next){
    Product.find({}, function(err, products){
        if(err){return next(err);}
        var num = products.length
        res.render('admin', {num});
    })
    
}

module.exports = adminIndex;