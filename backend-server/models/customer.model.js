var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({

    first_name: String,
    last_name: String,
    permanent_address: {
        flat_no: String,
        address: String,
        post_code: String,
        city: String,
        country: String
    },
    gender: String,
    email: String,
    telephone: Number

}, {timestamps: true})


var Customer = mongoose.model('Customer', CustomerSchema);
module.export = Customer;