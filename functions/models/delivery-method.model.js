const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    customer_id: String,
    account_id: String,
    option: String,
    price: String
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
module.exports = Delivery;