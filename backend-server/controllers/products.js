const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Department = require('../models/department.model');


productform = function(req, res, next){
    var queryId = req.params.id;
    Category.find({department_id:queryId}, function(err, data){
        if(err){
            req.flash('errorMsg', 'Something went wrong!!')
            console.error(err);
            return;
        }
        Department.findOne({_id:queryId}, function(err, department){
            if(err){return next(err)}
            res.render('new-product', {category: data, department});
        })
        
    }) 
}
showProducts = function(req, res){
    // console.log(req.session.secret);
    Product.find({}).exec(function(err, data){
        res.render('products', products = data);
        // console.log(process.env.NODE_ENV);
    })
}
postProduct = function(req, res, next){
    // console.log(req.body);
    var product = new Product();
    product.name = req.body.name;
    product.code = req.body.code;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.category = req.body.category;
    product.catCode = req.body.catCode;
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
    // res.redirect('/admin/products');
    
}
removeProduct = function(req, res){
    let idParam = req.params.id;
    let product = Product.remove({_id: idParam});
        product.exec(function(err){
            console.log(err);
        });
    res.redirect('/admin/products');  
}
editProduct = function(req, res){
    
    var id = req.params.id;
    Product.findOne({_id: id}).exec(function(err, product){
        Category.find({}, function(err, category){
            res.render('edit', {product, category});
        })
        // console.log(data);
    })
    
}
updateProduct = function(req, res){
    let queryId = req.params.id;
    // console.log(req.body);
    // console.log(queryId);
    let upProduct = {
        name: req.body.name,
        code: req.body.code,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        catCode: req.body.catCode,
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

module.exports = {showProducts, productform, postProduct, removeProduct, updateProduct, editProduct};