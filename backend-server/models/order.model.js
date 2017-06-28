var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var OrderSchema = new mongoose.Schema({
    order_no: {
        type: String
    },
    customer_name: String,
    customer_id: String,
    delivery_address: {
        flat_no: String,
        address: String,
        post_code: String,
        city: String,
        country: String
    },
    amount: SchemaTypes.Double,
    note: String,
    email: String,
    telephone: Number

}, {timestamps: true})


var Order = mongoose.model('Order', OrderSchema);
module.export = Order;