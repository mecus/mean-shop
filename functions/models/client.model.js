var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var clientSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {timestamps: true});

// clientSchema.pre("save", function save(next) {
//   const client = this;
//   if (!client.isModified("password")) { return next(); }
//   bcrypt.genSalt(10, function(err, salt){
//     if (err) { return next(err); }
//     bcrypt.hash(client.password, salt, undefined, function(err, hash){
//       if (err) { return next(err); }
//       client.password = hash;
//       next();
//     });
//   });
// });

clientSchema.methods.comparePassword = function(providePassword){
    if (this.password == providePassword){
        return true
    }
    return false;
    // bcrypt.compare(providePassword, this.password, function(err, isMatch){
    //     cb(err, isMatch);
    // });
}

var Client = mongoose.model('Client', clientSchema);
module.exports = Client;