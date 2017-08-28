const Address = require('../../../models/address-book.model');
const _ = require('lodash');



findAddress = function(req, res, next){
    const paramId = req.params.id;
    Address.find({account_id: paramId}).then(function(addresses){
        return res.json(addresses);
    }, function(error){
        return res.json({error: error.message});
    })
}
createAddress = function(req, res, next){
    // res.json(req.body);
    var address = new Address(req.body);
    Address.find({post_code: req.body.post_code}).then((data)=>{
        if(data && data.length){
            console.log(data);
            var returnAddress = _.take(_.filter(data, {"address_type":req.body.address_type}));
            console.log(returnAddress);
            if(returnAddress.length && returnAddress[0].address_type == req.body.address_type){
                return res.json({status: "Address Already Exist", id: returnAddress[0]._id});
            }else{
                address.save(function(err, addrs){
                    if(err){
                        res.json({error: err.message});
                    }else{
                        res.json({status: "Address Created", id: addrs.id});
                    }
                    
                });
            }
        }else{
            address.save(function(err, addrs){
                if(err){
                    res.json({error: err.message});
                }else{
                    res.json({status: "Address Created", id: addrs.id});
                }
                
            });
            
        }
    });
    
}
updateAddress = function(req, res, next){
    // res.json(req.body);
    var data = req.body;
    const paramId = req.params.id;
    Address.update({_id:paramId}, data, function(err){
        if(err){
            res.json({Error: err.message});
        }else{
            res.json({status: "Address Updated"});
        }
    })
}

deleteAddress = function(req, res, nesx){
    const paramId = req.params.id;
    Address.remove({_id:paramId},function(err){
        if(err){
            res.json({Error: err.message});
        }else{
            res.json({status: "Address Removed"});
        }
    })
}



module.exports = {findAddress, createAddress, updateAddress, deleteAddress}