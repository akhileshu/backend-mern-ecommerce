const { query } = require("express");
const Product = require("../model/product"); // Import your Products model

// Controller function to create a new user
exports.createProduct = async (req, res) => {
  try {
    const doc = new Product(req.body);
    await doc.save();
    // console.log(product)
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: "Error creating product" });
    // console.log(error)
  }
};

// Controller function to get all users
exports.fetchAllProducts = async (req, res) => {
  // we can access them using params key value
  // here we need all query strings
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let condition={}
  if(!req.query.admin){
    condition.deleted={$ne:true}
  }
  let query = Product.find(condition);
  let totalProductsQuery = Product.find({deleted:{$ne:true}});
  // since we cant use single query for fetching products as well as totalDocs count

  // order is important
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  // TODO : how to get sort on discounted price not on actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  const totalDocs = await totalProductsQuery.count().exec();
  // console.log({totalDocs})
  if (req.query._page && req.query._limit) {
    // this many doc i need to skip
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    // send totalDocs in header
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ error: "Error fetching all products" });
  }
};

// Controller function to get a specific user by ID
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;// Extracting Id from route parameter
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Controller function to update a user
exports.updateProduct = async (req, res) => {
  const { id } = req.params;// Extracting Id from route parameter

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, //return updated product
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Error updating product" });
  }
};

// Controller function to delete a user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await Users.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting user" });
//   }
// };
