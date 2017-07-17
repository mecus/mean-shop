var Product         = require('../models/product.model');
var cloudinary      = require('cloudinary');
var fs              = require('fs');
var path            = require('path');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

imageUpload = function(req, res, next){
    var id = req.body.id;
    var url = req.body.data;
    var public_id = req.body.public_id;

    Product.update({_id: id}, {$set: {imageUrl: url, photo_id: public_id}}, {upsert: true}, function(err){
      if(err){return next(err)}
      console.log("Image updated");
      res.redirect('/admin/products');
    });
   
    // cloudinary.uploader.upload(file.value,
    //   function(result){console.log(result)}, {public_id: "shop_image"})

}
imageRemove = function(image){
  cloudinary.uploader.destroy(image, {invalidate: true}, function(err, result){
    console.log(result);
  });
}

module.exports = {imageUpload, imageRemove};