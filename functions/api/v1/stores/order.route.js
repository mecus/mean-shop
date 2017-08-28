const Order     = require('../../../models/order.model');
const ItemOrder = require('../../../models/order-item.model');

getOrder = (req, res) =>{
    let paramId = req.params.id;
    Order.find({customer_no: paramId}).then((orders)=>{
        res.statusCode = "201";
        return res.json(orders);
    },(err)=>{
       return res.json({error: err.message});
    })
}

createOrder = (req, res) =>{
   let order = new Order(req.body);
   order.save((err, data)=>{
    if(err){return res.json({error: err.message})}
    return res.json({order_no: data.order_no, order_id: data._id});
   });

}

// Saving and Querying Order item list
getOrderItemList = (req, res)=>{
    let paramId = req.params.id;
    ItemOrder.find({order_id: paramId}).then((orderList)=>{
        res.statusCode = "201";
        return res.json(orderList);
    },(err)=>{
        return res.json({error: err.message});
    })

}
createOrderItemList = (req, res)=>{
    let itemOrder = new ItemOrder(req.body);
    itemOrder.save((err, data)=>{
        if(err){return res.json({error: err.message})}
        return res.json({status: "Posted", order_no:data.order_id});
    });
}


module.exports = {getOrder, createOrder, getOrderItemList, createOrderItemList}