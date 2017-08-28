const Youtube = require('../models/youtube.model');


getYoutube = function(req, res, next){
    Youtube.find({}).exec(function(err, data){
        res.render('youtube', {title: 'Youtube Video', video:data});
    })
}
saveVideo = function(req, res, nex){
    console.log(req.body);

    var video = new Youtube();
    video.name = req.body.name;
    video.tag = req.body.tag;
    video.youtube_link = req.body.youtube_link;

    video.save(function(err){
        if(err){return next(err);}
        res.redirect('/admin/youtube');
    })
}
deleteVideo = function(req, res, next){
    Youtube.remove({_id:req.params.id}).exec(function(err){
        if(err){return next(err);}
        res.redirect('/admin/youtube');
    })
}

module.exports = { getYoutube, saveVideo, deleteVideo }