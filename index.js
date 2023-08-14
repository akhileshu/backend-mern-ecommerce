const express = require("express");
const mongoose = require("mongoose");
const { createProduct } = require("./controller/product");
const productsRouter=require('./routes/products')
const brandsRouter=require('./routes/brands')
const categoriesRouter=require('./routes/categories')
const server = express();
const cors=require('cors')

// middleware
server.use(cors({
  exposedHeaders:['X-Total-Count']
}))
server.use(express.json());
server.use('/products',productsRouter)
server.use('/brands',brandsRouter)
server.use('/categories',categoriesRouter)

main().catch((error) => console.log(error));
async function main() {
  // mongodb://127.0.0.1:27017/dbname
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("connected to db");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});
// server.post("/products", createProduct);
server.listen(8080, () => console.log("server started"));
