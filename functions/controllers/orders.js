const Order     = require('../models/order.model');

getOrders = function(req, res){

    Order.find({}).then((orders)=>{
        // console.log(orders);
        res.render('orders', {orders});
    }, (err)=>console.log(err));
    
}

module.exports = {getOrders};