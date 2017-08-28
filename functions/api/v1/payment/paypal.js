const braintree     = require('braintree');
const _ = require('lodash');
const gateway       = require('../../../configurations/paypal-gateway');
const { Account }       = require('../../../models/account.model');
const Address       = require('../../../models/address-book.model');
const Transaction   = require('../../../models/transaction.model');

function formatErrors(errors) {
    var formattedErrors = '';
  
    for (var i in errors) { // eslint-disable-line no-inner-declarations, vars-on-top
      if (errors.hasOwnProperty(i)) {
        formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
      }
    }
    return formattedErrors;
}

const payPalMethod = (req, res)=>{
    var queryId = req.body.uid;
    var payNonce = req.body.nonce;
        Account.findOne({uid:queryId}).then(function(account){
                // console.log(address[0]);
                // console.log(account);
            var newcustomer = {
                firstName: account.first_name,
                lastName: account.last_name,
                email: account.email,
                phone: '0'+account.telephone.mobile,
                paymentMethodNonce: payNonce,
                deviseData: null
                

            }
        if(account.ac_no){
            //Run payment method update here
            gateway.customer.update(account.ac_no, {
                paymentMethodNonce: payNonce,
                }, function (err, result) {
                    if(err){return res.json({error: err.message})}
                    res.json(result);
            });
        }else{
            // console.log(account);
            // console.log(newcustomer);
            gateway.customer.create(newcustomer, function (err, result) {
                if(err){
                    console.log(err.message);
                    return res.json({error: err.message}); 
                }
                // true
                if(result.success == true){
                    console.log(result.customer.id);
                    Account.update({_id:account.id}, {$set: {ac_no:result.customer.id}})
                    .then(function(){
                        res.json({status: "Customer Account Created and Updated", payment_method: "Paypal"});
                    },function(err){
                        res.json({error: err.message});
                    });
                }else{
                    console.log(result.success)
                    res.json({status: result.success});
                }
                // e.g. 494019
            }); //creating customer ends
        }// Else for creating customer ends here
    
            
        },function(err){
            res.json({error: err.message});
    })

}
paypalTransaction = (req, res)=>{
    // if(req.body.payment_method == "paypal"){
    //     console.log(req.body);
    //     return;
    // }
    var transactionErrors;
    gateway.transaction.sale({
        paymentMethodToken: req.body.token,
        amount: req.body.amount,
        orderId: req.body.order_no,
        deviceData: req.body.deviceData || null,
        options: {
            submitForSettlement: true
        }
        }, function (err, result) {
            if (result.success || result.transaction) {
                // Save Transaction to the database
                // res.json(result.transaction.id);
                // console.log(result.message);
                // console.log(result.params);
                let transaction = new Transaction({
                    customer_name: result.transaction.customer.firstName+" "+result.transaction.customer.lastName,
                    order_no: result.transaction.orderId,
                    customer_no: result.transaction.customer.id,
                    transaction_id: result.transaction.id,
                    email: result.transaction.customer.email,
                    telephone: result.transaction.customer.phone,
                    amount: result.transaction.amount,
                    success: result.success,
                    status: result.transaction.status,
                    authorization_code: result.transaction.processorAuthorizationCode,
                    card_type: result.transaction.creditCard.cardType,
                    expiration_date: result.transaction.creditCard.expirationDate,
                    card_number: result.transaction.creditCard.maskedNumber,
                    card_last4: result.transaction.creditCard.last4,
                    payment_token: result.transaction.creditCard.token,
                    message: result.message || null
                });
                transaction.save((err, data)=>{
                    if(err){res.json({error: err.message})}
                    res.json({success: result.success, transaction_id: data._id, payment_status: result.transaction.status, message: result.message || null});
                });

            } else {
                transactionErrors = result.errors.deepErrors();
                res.json('error', {msg: formatErrors(transactionErrors)});
            }
    });


}

module.exports = {payPalMethod, paypalTransaction};