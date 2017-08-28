const braintree     = require('braintree');
const _ = require('lodash');
const gateway       = require('../../../configurations/paypal-gateway');
const { Account }       = require('../../../models/account.model');
const Address       = require('../../../models/address-book.model');
const Transaction   = require('../../../models/transaction.model');
const { payPalMethod, paypalTransaction } = require('./paypal');
const { creaditCardMethod, creditCardTransaction } = require('./creditCard');

var TRANSACTION_SUCCESS_STATUSES = [
  braintree.Transaction.Status.Authorizing,
  braintree.Transaction.Status.Authorized,
  braintree.Transaction.Status.Settled,
  braintree.Transaction.Status.Settling,
  braintree.Transaction.Status.SettlementConfirmed,
  braintree.Transaction.Status.SettlementPending,
  braintree.Transaction.Status.SubmittedForSettlement
];

function formatErrors(errors) {
  var formattedErrors = '';

  for (var i in errors) { // eslint-disable-line no-inner-declarations, vars-on-top
    if (errors.hasOwnProperty(i)) {
      formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
    }
  }
  return formattedErrors;
}

getToken = function(req, res, next){
    // res.json({clientToken: "9e5f00bb7a29c3c49398a9287c6d13d1"});
    gateway.clientToken.generate({}, function (err, response){
        if(err){
            res.json({message: err});
        }
        res.json({clientToken: response.clientToken});
    });
}
//Testing Route for card fetch
fetchCard = function(req, res, next){
    let cards = [
        {
            card_number: "2345 6578 3489 0098",
            cvc: "123",
            expires: "12/2020",
            post_code: "SE12 5HJ",
            type: "Visa"
        }
    ];
    res.json(cards);
}

postTransaction = function(req, res, next){
    //Remove this line below later
    if(req.body.payment_method == "paypal"){
        // console.log(req.body);
        paypalTransaction(req, res);
        return;
        // return res.json({Action: "Can not send transaction now"});
    }else if(req.body.payment_method == "card"){
        creditCardTransaction(req, res);
    }else{
        return res.json('error', {msg: "Unknown Payment Method Selected"});
    }
    // console.log(req.body);
    // var transactionErrors;
    // // var amount = req.body.amount; // In production you should not take amounts directly from clients
    // // var nonce = req.body.payment_method_nonce;

    // gateway.transaction.sale({
    //     paymentMethodToken: req.body.token,
    //     amount: req.body.amount,
    //     orderId: req.body.order_no,
    //     deviceData: req.body.deviceData || null,
    //     options: {
    //         submitForSettlement: true
    //     }
    //     }, function (err, result) {
            
    //         if (result.success || result.transaction) {
    //             // Save Transaction to the database
    //             // res.json(result.transaction.id);
    //             console.log(result.transaction);
    //             let transaction = new Transaction({
    //                 customer_name: result.transaction.customer.firstName+" "+result.transaction.customer.lastName,
    //                 order_no: result.transaction.orderId,
    //                 customer_no: result.transaction.customer.id,
    //                 transaction_id: result.transaction.id,
    //                 email: result.transaction.customer.email,
    //                 telephone: result.transaction.customer.phone,
    //                 amount: result.transaction.amount,
    //                 success: result.success,
    //                 status: result.transaction.status,
    //                 authorization_code: result.transaction.processorAuthorizationCode,
    //                 card_type: result.transaction.creditCard.cardType,
    //                 expiration_date: result.transaction.creditCard.expirationDate,
    //                 card_number: result.transaction.creditCard.maskedNumber,
    //                 card_last4: result.transaction.creditCard.last4,
    //                 payment_token: result.transaction.creditCard.token
    //             });
          
    //             transaction.save((err, data)=>{
    //                 if(err){res.json({error: err.message})}
    //                 res.json({success: result.success, transaction_id: data._id, payment_status: result.transaction.status});
    //             });

    //         } else {
    //             transactionErrors = result.errors.deepErrors();
    //             res.json('error', {msg: formatErrors(transactionErrors)});
    //         }
    // });

}

//Creating a new customer with a payment method
postCustomer = function(req, res, next){
    // Req.body = {nonce: "", customerId: "", method: ""}

    if(req.body.method == "paypal"){
        return payPalMethod(req, res);
    }else if(req.body.method == "card"){
        return creaditCardMethod(req, res);
    }else{
        return null;
    }

}


getCustomer = function(req, res, next){
    var customerId = req.params.id;
    
    gateway.customer.find(customerId, function(err, customer){
        if(err){
            console.log(err); 
            return res.json({error: err.message});
        }
        let ld = _.lastIndexOf(customer.creditCards);
        // console.log(customer);
        res.json({card: customer.creditCards, paypal:customer.paypalAccounts});
    })
}

module.exports = { getCustomer, getToken, postTransaction, postCustomer, fetchCard }