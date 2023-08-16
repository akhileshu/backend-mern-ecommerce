const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    // url->(${url}orders/user/${userId})
    try {
      const orders = await Order.find({ user: userId }).populate('user')

      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.createOrder = async (req, res) => {
    // req.body is object containing all essential info of order item
    const order = new Order(req.body);
    try {
      const doc = await order.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.fetchAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    // url->(http://localhost:8080/orders?_sort=id&_order=asc&_page=1&_limit=10&)
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  
    // sorting by order id is not working becuase id is not a number
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);// middleware -> we need to specify this in cors
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  