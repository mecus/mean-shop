const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    order_no: {
        type: String
    },
    customer_name: String,
    customer_no: String,
    account_id: String,
    amount: SchemaTypes.Double,
    note: String,
    email: String,
    telephone: Number,
    delivery_method: String,
    status: String,
    ip_address: String

}, {timestamps: true})


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;