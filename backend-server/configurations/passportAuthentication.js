var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.model');


passport.serializeUser(function(user, done){
    done(undefined, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done){

    User.findOne({username: username}, function(err, user){
        if(err){return done(err);}

        if(!user){
            return done(null, false, {message: "user not found"});
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){return next(err);}
            if(isMatch){
                return done(null, user);
            }
            return done(null, false, {message: "Invalid username and password"});
        })
    });

}));


const isAuthenticated = function(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login");
};

module.exports = isAuthenticated;


