const braintree     = require('braintree');
const gateway       = require('../../configurations/paypal-gateway');

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

getCheckout = function(req, res, next){
    // res.json({clientToken: "9e5f00bb7a29c3c49398a9287c6d13d1"});
    gateway.clientToken.generate({}, function (err, response){
        if(err){
            res.json({message: err});
        }
        res.json({clientToken: response.clientToken});
    });
}

postTransaction = function(req, res, next){

    var transactionErrors;
    var amount = req.body.amount; // In production you should not take amounts directly from clients
    var nonce = req.body.payment_method_nonce;

    gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
        submitForSettlement: true
    }
    }, function (err, result) {
        if (result.success || result.transaction) {
            //Save Transaction to the database
            res.json(result.transaction.id);
        } else {
            transactionErrors = result.errors.deepErrors();
            req.json('error', {msg: formatErrors(transactionErrors)});
        }
    });

}


module.exports = { getCheckout, postTransaction }