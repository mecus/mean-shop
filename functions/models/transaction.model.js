const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

const TransacSchema = new mongoose.Schema({
    customer_name: String,
    order_no: String,
    customer_no: String,
    transaction_id: String,
    email: String,
    telephone: String,
    amount: SchemaTypes.Double,
    success: String,
    status: String,
    authorization_code: String,
    card_type: String,
    expiration_date: String,
    card_number: String,
    card_last4: String,
    payment_token: String,
    message: String
}, {timestamps: true})

const Transaction = mongoose.model('Transaction', TransacSchema);
module.exports = Transaction;