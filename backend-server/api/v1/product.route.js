const Product = require('../../models/product.model');

getProducts = function(req, res){
    if(req.headers['content-type'] !== undefined){
        res.status(415).json({"Error": "Content-Type is require"});
    }else{
        Product.find({publish: true}, function(err, products){
            if(err){
                res.statusCode = 406;
                res.json({"Error": "Content not available"});
            }else{
                res.json(products);
            }
        });
        // res.json({"Products": ['Banana', 'Orange', 'Mango']});
    } 
}
//Come back later for the request option
let option = {
    'content-length': '123',
    'content-type': 'application/json',
    'connection': 'keep-alive',
    'host': 'mysite.com',
    'accept': '*/*' 
}

getProduct = function(req, res, option){
    let idParam = req.params.id;
    Product.findOne({_id: idParam}).exec(function(err, product){
        if(err){
            res.status(404).json({"Error": "The Document can not be found"});
            
        }else{
            res.json(product);
        }
    })
}
postProduct = function(req, res){
    if(req.headers['content-type'] !== 'application/json'){
        res.status(415).json({"Error": "Content-Type is require"});  
    }else{
        let products = new Product();
        products.name = req.body.name;
        products.code = req.body.code;
        products.price = req.body.price;
        products.imageUrl = req.body.imageUrl;
        products.category = req.body.category;
        products.catCode = req.body.catCode;
        products.description = req.body.description;
        products.nutrition = req.body.nutrition;

        products.save(function(err){
            if(err){
                res.status(400);
                res.json(JSON.stringify(err));
                console.log("something bad happen");
                
            }else{
                Product.findOne({name: req.body.name}).exec(function(err, product){
                    if(err){
                        res.status(204).json({data: null});
                    }else{
                        res.status(201).json(product);
                    }
                });
            }
        })
    }
}
removeProduct = function(req, res){
    let idParam = req.params.id;
    let product = Product.remove({_id: idParam});
        product.exec(function(err){
            console.log(err);
            res.json(JSON.stringify(err));
        });
    res.statusCode = 204;  
}
updateProduct = function(req, res){
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