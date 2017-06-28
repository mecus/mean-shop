
getOrders = function(req, res){
    res.render('orders', {title: "Customers order"});
}

module.exports = {getOrders};