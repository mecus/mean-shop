var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }  
}, {timestamps: true});

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, function(err, hash){
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(providePassword, cb){
    bcrypt.compare(providePassword, this.password, function(err, isMatch){
        cb(err, isMatch);
    });
}

var User = mongoose.model('User', userSchema);
module.exports = User;