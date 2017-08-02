const Youtube       = require('../../models/youtube.model');

getYoutube = function(req, res, next){
    Youtube.find({}).exec(function(err, video){
        if(err){return next(err);}
        if(req.query.tag){
            Youtube.find({tag: req.query.tag}).exec(function(err, query){
                if(err){return next(err);}
                res.json(query);
            })
        }else{
            res.json(video);
        }
    });
}

module.exports = getYoutube;