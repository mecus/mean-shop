const Product = require('../../../models/product.model');
const Department  = require('../../../models/department.model');
const Category  = require('../../../models/category.model');
const SubCategory  = require('../../../models/sub-category.model');
const Advert       = require('../../../models/advert.model');

getStoreData = function(req, res, next){
  // console.log(req.headers);
    Department.find({}).exec(function(err, department){
        if(err){return next(err);}
        Category.find({}, function(err, category){
            if (err) {res.json({"Error": err});}
            SubCategory.find({}, function(err, subcategory){
                if(err){res.json({"Error": err});}
                Product.find({publish: true}, function(err, products){
                    if(err){
                        res.statusCode = 406;
                        res.json({"Error": "Content not available"});
                    }else{
                        res.json({department, category, subcategory, products});
                    }
                });
            });
        });
    });
}
getStoreAd = function(req, res, next){
    Advert.find({}, function(err, advert){
        res.json(advert);
    })
}

module.exports = {getStoreData, getStoreAd}
