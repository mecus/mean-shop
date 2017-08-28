getCustomers = function(req, res){
    res.render('customers', {title: "Displaying customers"});
}

module.exports = {getCustomers}