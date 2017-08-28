var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    title: String,
    ac_no: Number,
    uid: String,
    first_name: String,
    last_name: String,
    contact_permission: String,
    selected_address: String,
    terms: String,
    age_limit: String,
    email: String,
    telephone: {
        home: Number,
        mobile: Number
         
    }

}, {timestamps: true})

var CounterSchema = new mongoose.Schema({
    ac_no: String,
    sequence_value: Number
})
var Counter =mongoose.model('Counter', CounterSchema);
getNextSequenceValue = function(sequenceName){

    var update = {$inc:{sequence_value:1}};
    return Counter.findOneAndUpdate({ac_no: sequenceName}, update, {new: true}, function (err, counter){
        if(err)(console.log(err));
        return counter;
    });
    // console.log(seqCounter);
//    var sequenceDocument = Counter.findOneAndUpdate({
//       query:{ac_no: sequenceName },
//       update: {$inc:{sequence_value:1}},
//       new:true
//    }, function(err, counter){
//        return counter;
//        console.log(counter);
//    });
	
//    return sequenceDocument.sequence_value;
}
insertCounter = function(){
    var count = new Counter({
        ac_no: "accountid",
        sequence_value: 0
    })
    count.save(function(err){
        if(err){console.log(err)}
    });
}


var Account = mongoose.model('Account', AccountSchema);

module.exports = { Account, Counter, getNextSequenceValue, insertCounter};