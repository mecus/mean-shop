const Product = require('../models/product.model');
const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');
const Department = require('../models/department.model');
const uploader  = require('./uploader');
const Math = require('mathjs');


productform = function(req, res, next){
    var queryId = req.params.id;
    SubCategory.findOne({_id:queryId}, function(err, data){
        if(err){
            req.flash('errorMsg', 'Something went wrong!!')
            console.error(err);
            return;
        }
        res.render('new-product', {category: data});

    }) 
}
viewProduct = function(req, res, next){
    var id = req.params.id;
    Product.findOne({_id:id}, function(err, product){
        // console.log(product);
        if(err){
            res.redirect('/admin/products');
            return next(err); 
        }else{
            res.render('view-product', product);
        }
    })
}
showProducts = function(req, res, next){
    // console.log(req.session.secret);
    Product.find({}).exec(function(err, data){
        if(err){return next(err);}
        res.render('products', products = data);
        // console.log(process.env.NODE_ENV);
    })
}
postProduct = function(req, res, next){
    // console.log(req.body);
    var prodPrice = Number(req.body.price).toFixed(2);
    var product = new Product();
    product.name = req.body.name;
    product.code = req.body.code;
    product.price = prodPrice;
    product.imageUrl = req.body.imageUrl;
    product.category = req.body.category;
    product.department_id = req.body.department_id;
    product.category_id = req.body.category_id;
    product.subcategory_id = req.body.subcategory_id;
    product.stock = req.body.stock;

    product.description.detail = req.body.detail;
    product.description.size = req.body.size;
    product.description.origin = req.body.origin;

    product.nutrition.energy = req.body.energy;
    product.nutrition.fat = req.body.fat;
    product.nutrition.saturates = req.body.saturates;
    product.nutrition.salt = req.body.salt;

    product.publish = req.body.publish;

    product.save(function(err){
        if(err){
            console.log("something bad happen");
            next(err);
        }
        res.redirect('/admin/products');
    });
    
    
}
removeProduct = function(req, res, next){
    let idParam = req.params.id;
    Product.findOne({_id: idParam}, function(err, data){
        uploader.imageRemove(data.photo_id);
        Product.remove({_id: idParam})
        .exec(function(err){
            console.log(err);
        });
        
    })
    
    res.redirect('/admin/products');  
}
editProduct = function(req, res, next){
    
    var id = req.params.id;
    Product.findOne({_id: id}).exec(function(err, product){
        Category.find({}, function(err, category){
            res.render('edit', {product, category});
        })
        // console.log(data);
    })
    
}
updateProduct = function(req, res, next){
    let queryId = req.params.id;
    // console.log(req.body);
    // console.log(queryId);
    var prodPrice = Number(req.body.price).toFixed(2);
    let upProduct = {
        name: req.body.name,
        code: req.body.code,
        price: prodPrice,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        department_id: req.body.department_id,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        stock: req.body.stock,

        description: {
            detail: req.body.detail,
            size: req.body.size,
            origin: req.body.origin
        },
        nutrition: {
            energy: req.body.energy,
            fat: req.body.fat,
            saturates: req.body.saturates,
            salt: req.body.salt,
        },
        publish: req.body.publish
    }

    Product.update({_id: queryId}, upProduct, function(err){
        if(err){
            res.send(err);
        }else{
            res.redirect('/admin/products');
        }
    })

}

module.exports = {
    showProducts, productform, postProduct, 
    removeProduct, updateProduct, editProduct,
    viewProduct
};