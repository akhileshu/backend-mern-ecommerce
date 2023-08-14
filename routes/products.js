const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/product");
const router = express.Router();

// /products is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById) //http://localhost:8080/products/64da0304a2a9c3c3e88264a5
  .patch("/:id", updateProduct);

module.exports = router;
