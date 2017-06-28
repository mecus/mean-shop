var Product         = require('../models/product.model');
var cloudinary      = require('cloudinary');
var fs              = require('fs');
var path            = require('path');

cloudinary.config({ 
  cloud_name: 'dxxw6jfih', 
  api_key: '713573881711642', 
  api_secret: 'hfll2wcsfo2SXltiO2LiRxZ5Y0k' 
});

imageUpload = function(req, res, next){
    var id = req.body.id;
    var url = req.body.data;

    Product.update({_id: id}, {$set: {imageUrl: url}}, {upsert: true}, function(err){
      if(err){return next(err)}
      console.log("Image updated");
      res.redirect('/admin/products');
    });
   
    // cloudinary.uploader.upload(file.value,
    //   function(result){console.log(result)}, {public_id: "shop_image"})

}

module.exports = imageUpload;