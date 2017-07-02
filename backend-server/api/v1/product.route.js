const Product = require('../../models/product.model');
const Department  = require('../../models/department.model');

getProducts = function(req, res, next){
    Department.find({}).exec(function(err, department){
        if(err){return next(err);}

        Product.find({publish: true}, function(err, products){
            if(err){
                res.statusCode = 406;
                res.json({"Error": "Content not available"});
            }else{
                res.json({department, products});
            }
        });
    })
    

    // if(req.headers['content-type'] !== undefined){
    //     res.status(415).json({"Error": "Content-Type is require"});
    // }else{
    //     Product.find({publish: true}, function(err, products){
    //         if(err){
    //             res.statusCode = 406;
    //             res.json({"Error": "Content not available"});
    //         }else{
    //             res.json(products);
    //         }
    //     });
    // } 
}
//Come back later for the request option
let option = {
    'content-length': '123',
    'content-type': 'application/json',
    'connection': 'keep-alive',
    'host': 'mysite.com',
    'accept': '*/*' 
}

getProduct = function(req, res, next){
    let idParam = req.params.id;
    Product.findOne({_id: idParam}).exec(function(err, product){
        if(err){
            res.status(404).json({"Error": "The Document can not be found"});
            
        }else{
            res.json(product);
        }
    })
}

updateProduct = function(req, res, next){
    let queryId = req.params.id;
    let upProduct = {
        name: req.body.name,
        code: req.body.code,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        catCode: req.body.catCode,
        description: req.body.description,
        nutrition: req.body.nutrition
    }
    Product.update(queryId, upProduct, function(err){
        if(err){
            res.status(403).json({"Error": "Update Refused!"});
        }else{
            res.json({"Message": "Document updated successfully"});
        }
    })
}

module.exports = {getProducts, getProduct, postProduct, removeProduct, updateProduct};