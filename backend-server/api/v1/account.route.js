var db = require('../../models/account.model');


getAccount = function(req, res, next){
    let uId = req.params.id;
    db.Account.findOne({email: uId}, function(err, account){
        if(err){res.json({message: err.message}); return;}
        res.json(account);
    })
    console.log(db.getNextSequenceValue("accountid"));
    // db.insertCounter();
}
postAccount = function(req, res, next){

    if(!req.body){res.json({message: "Req Body Must not be Empty"}); return;}
    var account = new db.Account({
        ac_no: 5812,
        title: req.body.title,
        uid: req.body.uid,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        billing_address: {
            address: req.body.billing_address.address,
            address2: req.body.billing_address.address2,
            post_code: req.body.billing_address.post_code,
            city: req.body.billing_address.city,
            country: req.body.billing_address.country
        },
        delivery_address: {
            full_name: req.body.delivery_address.full_name,
            address: req.body.delivery_address.address,
            address2: req.body.delivery_address.address2,
            post_code: req.body.delivery_address.post_code,
            city: req.body.delivery_address.city,
            country: req.body.delivery_address.country
        },
        contact_permission: req.body.contact_permission,
        selected_address: req.body.selected_address,
        terms: req.body.terms,
        age_limit: req.body.age_limit,
        email: req.body.email,
        telephone: req.body.telephone
    });
    account.save(function(err){
        if(err){
            res.json({message: err.message});
        }else{
            res.json({status: "Account Posted"});
        }
    })
    

}

updateAccount = function(req, res, next){
    var id = req.params.id;
    var accountUpdate = {
        title: req.body.title,
        uid: req.body.uid,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        billing_address: {
            address: req.body.billing_address.address,
            address2: req.body.billing_address.address2,
            post_code: req.body.billing_address.post_code,
            city: req.body.billing_address.city,
            country: req.body.billing_address.country
        },
        delivery_address: {
            address: req.body.delivery_address.address,
            address2: req.body.delivery_address.address2,
            post_code: req.body.delivery_address.post_code,
            city: req.body.delivery_address.city,
            country: req.body.delivery_address.country
        },
        contact_permission: req.body.contact_permission,
        selected_address: req.body.selected_address,
        terms: req.body.terms,
        age_limit: req.body.age_limit,
        email: req.body.email,
        telephone: req.body.telephone
    }
    db.Account.update({_id: id}, {$set: accountUpdate}, {upsert: true}, function(err){
        if(err){res.json({message: err.message}); return;}
        else{
            res.json({status: "Account Updated", id: id});
        }
    })

}

module.exports = {getAccount, postAccount, updateAccount};