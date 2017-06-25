var cloudinary      = require('cloudinary');
var fs              = require('fs');
var path            = require('path');

cloudinary.config({ 
  cloud_name: 'dxxw6jfih', 
  api_key: '713573881711642', 
  api_secret: 'hfll2wcsfo2SXltiO2LiRxZ5Y0k' 
});

imageUp = function(req, res){
    var file = req.body;
    console.log(file);
   
    // cloudinary.uploader.upload(file.value,
    //   function(result){console.log(result)}, {public_id: "shop_image"})

}

module.exports = imageUp;