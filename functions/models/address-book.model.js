const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    customer_id: String,
    account_id: String,
    full_name: String,
    address_type: String,
    address: String,
    address2: String,
    post_code: String,
    city: String,
    country: String
})


const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;