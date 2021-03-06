const Advert    = require('../models/advert.model');
const uploader  = require('./uploader');

getAd = function(req, res, next){
    var queryId = req.params.id;
    Advert.find({department_id:queryId}, function(err, advert){
        if(err){ return next(err);}
        else{
            res.render("advert", {title: "Advert", d_id: queryId, advert});
        }
    })
}
saveAd = function(req, res, next){
    var advert = new Advert();
    advert.title = req.body.title,
    advert.photo_id = req.body.photo_id,
    advert.photo_url = req.body.photo_url,
    advert.department_id = req.body.department_id

    advert.save(function(err){
        if(err){ return next(err);}
        else{
            res.redirect('/admin/advert/'+req.body.department_id);
        }
    })

}
removeAd = function(req, res, next){
    var queryId = req.params.id;
    Advert.findOne({_id: queryId}, function(err, data){
        if(err){
           throw err
        }
        if(data){
            uploader.imageRemove(data.photo_id);
            Advert.remove({_id:data._id}).exec(function(err){
                if(err){return next(err);}
                res.redirect('/admin/advertise');
            })
        }else{
            res.redirect('/admin/advertise');
        }
    })

}
//Creating general adverts
getGAd = function(req, res, next){
    Advert.find({}, function(err, advert){
        if(err){ return next(err);}
        else{
            res.render('advertise', {title: "Store Advertisement", advert});
        }
    })
}
saveGAd = function(req, res, next){
    var advert = new Advert();
    advert.title = req.body.title,
    advert.photo_id = req.body.photo_id,
    advert.photo_url = req.body.photo_url,
    advert.tag = req.body.tag,
    advert.department_id = null

    advert.save(function(err){
        if(err){ return next(err);}
        else{
            res.redirect('/admin/advertise/');
        }
    })
}

module.exports = {getAd, saveAd, removeAd, getGAd, saveGAd }
