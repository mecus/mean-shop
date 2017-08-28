const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

const OrderItemSchema = new mongoose.Schema({
    order_no: {
        type: String
    },
    order_id: String,
    product_id: String,
    name: String,
    image: String,
    price: SchemaTypes.Double,
    qty: String,


}, {timestamps: true})


const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
module.exports = OrderItem;