const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/order");

const router = express.Router();
//  /orders is already added in base path
router
  .post("/", createOrder)
  .get("/own", fetchOrdersByUser)//changed from query string to parameterized routing
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get('/',fetchAllOrders);

module.exports = router;
