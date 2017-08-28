const braintree     = require('braintree');
const gateway       = require('../../../configurations/paypal-gateway');
const db = require('../../../models/account.model');
const ObjectId = require('mongodb').ObjectID;
const paymentGateway = require('../payment/checkout');



getAccount = function(req, res, next){
    // paymentGateway.getCustomer();
    let uId = req.params.id;
    db.Account.findOne({email: uId}, function(err, account){
        if(err){res.json({message: err.message}); return;}
        res.json(account);
    })
    // console.log(db.getNextSequenceValue("accountid"));
    // db.insertCounter();
}
postAccount = function(req, res, next){
    var data = req.body;
    if(!req.body){res.json({message: "Req Body Must not be Empty"}); return;}
    var account = new db.Account(data);
    account.save(function(err, ac){
        if(err){
            res.json({message: err.message});
        }else{

            res.json({status: "Account Posted", id:ac.id});
        }
    })
    
}

updateAccount = function(req, res, next){

    db.Account.update({_id: ObjectId(req.params.id)}, {$set: req.body})
        .then(function(resp){
            console.log(resp);
            return res.json({status: "Account Updated", response: resp});
      
        }).catch(function(error){
            console.log(error)
            return res.json({message: error.message});
        })

}

module.exports = {getAccount, postAccount, updateAccount};