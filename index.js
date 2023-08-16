const express = require("express");
const mongoose = require("mongoose");
const productsRouter=require('./routes/products')
const brandsRouter=require('./routes/brands')
const categoriesRouter=require('./routes/categories')
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/order')

const server = express();
const cors=require('cors')

// middleware
server.use(cors({
  exposedHeaders:['X-Total-Count']
}))
server.use(express.json());//to parse incoming JSON data from client requests
server.use('/products',productsRouter)
server.use('/brands',brandsRouter)
server.use('/categories',categoriesRouter)
server.use('/auth',authRouter)
server.use('/users',userRouter)
server.use('/cart',cartRouter)
server.use('/orders',orderRouter)

// connection to db
main().catch((error) => console.log(error));
async function main() {
  // mongodb://127.0.0.1:27017/dbname
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("connected to db");
}

// handling home page request
server.get("/", (req, res) => {
  res.json({ status: "success" });
});
server.listen(8080, () => console.log("server started"));
