var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    order_no: {
        type: String
    },
    customer_name: String,
    delivery_address: {
        flat_no: String,
        address: String,
        post_code: String,
        city: String,
        country: String
    },
    amount: String,
    note: String,
    email: String,
    telephone: String

}, {timestamps: true})


var Order = mongoose.model('Order', OrderSchema);
module.export = Order;