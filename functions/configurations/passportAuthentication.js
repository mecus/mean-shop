var User = require('../models/user.model');
var passport    = require('passport');
var LocalStrategy = require('passport-local');
var crypto          = require('crypto');

passport.serializeUser(function(user, done){
    done(undefined, user);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

//User Login and Registration GET http Routes
const registration = function(req, res, next){
    res.render('registration', {title: "this is user registration page"})
}
const logIn = function(req, res, next){
    res.render('login', {title: "Login with your username"});
}

//Authenticating User
const loggedIn = function(req, res, next){
    // console.log(req.body.username.toLowerCase());
    req.checkBody('username', 'username must not be empty').notEmpty();
    req.checkBody('password', 'Password must be present').notEmpty();
    var password = req.body.password;
    var username = req.body.username;

    var errors = req.validationErrors();
    if(errors){req.flash('error', errors); return res.redirect('/admin/login');}

    User.findOne({username: username}, function(err, user){
        if(err){return next(err);}
        if(!user){
            console.log("no user found");
            req.flash('dbError', 'User not found');
            return res.redirect('/admin/login');
        }else{
            // console.log(user.verifyPassword(password));
            user.comparePassword(password, function(err, isMatch){
                if (err) {return next(err);}
                if (!isMatch) {
                    console.log("password mismatch");
                    req.flash('dbError', 'Invalid password try again');
                    return res.redirect('/admin/login');

                }else if (isMatch) {
                    req.logIn(user.id, function(err){
                        if(err) { return next(err);};
                        console.log("user logged in");
                        req.flash('dbSuccess', 'You have successfully logged in');
                        res.redirect('/admin/dashboard');
                    }) 
                } else{
                    req.flash('dbError', 'Incurrect username or password');
                    res.redirect('/admin/login');
                }
            })

        }
        
    })
    // passport.authenticate('local', function(err, user, info){
    //     console.log(user);
    //     if(err){return next(err);}
    //     if(!user){
    //         req.flash('error', info);
    //         return res.redirect('/admin/login');
    //     }
    //     req.logIn(user, function(err){
    //         if(err){return next(err);}
    //         req.flash("success", { msg: "Success! You are logged in." });
    //         res.redirect(req.session.returnTo || '/admin/dashboard');
    //     })
    // }), (req, res, next);

}
//Logout User
const logOut = function(req, res, next){
    req.logOut();
    res.redirect('/admin/login');
}

//Creating User Account
const registered = function(req, res, next){
    req.checkBody('username', 'user must not be empty').notEmpty();
    req.checkBody('username', 'username must be min of 5 characters').len(4, 15);
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('email', 'Email must not be less than 5 and not more than 100 characters').len(5, 100);
    req.checkBody('password', 'Password must be atleast 4 characters').len(4, 20);
    req.checkBody('passwordConfirmation', 'Password do not match! try again.').equals(req.body.password);

    var errors = req.validationErrors();
    // console.log(errors);
    if(errors){req.flash('error', errors); return res.redirect('/admin/registration');}
    var username = req.body.username.toLowerCase();
    //Creating user instance from the userModel
    var user = new User({
        username: username,
        email: req.body.email,
        password: req.body.password
    });
    //Checking if the user already exist
    User.findOne({email: req.body.email}, function(err, existUser){
        if(err){return next(err);}
        if(existUser){
            req.flash('dbError', 'The email is already taken, try another email please..');
            res.redirect('/admin/registration');
        }else{
             //save user 
            user.save(function(err){
                if(err){return next(err);}
    
                req.flash('userSuccess', 'You are successfully registered');
                res.redirect('/admin/dashboard');
            })
        }
    })
}
const isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/admin/login');
}
//=== More route to come ===//
//Update User
//Delete User
//Forgotten Password

module.exports = { registration, registered, logIn, 
                   loggedIn, logOut, isAuthenticated
                }
