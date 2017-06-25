
getOrders = function(req, res){
    res.render('orders', {title: "This is the order page"});
}

module.exports = {getOrders};