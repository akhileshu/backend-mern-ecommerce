const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    // populate -> fetch all info of product and user
    const cartItems = await Cart.find({ user: id })
      // Cart.find({ user: user }), the user field in the documents is being matched with the provided user ID.
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: "Error fetching cart by user id" });
  }
};
exports.addToCart = async (req, res) => {
  try {
    const {id}=req.user
    const cart = new Cart({...req.body,user:id});
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Error adding to cart" });
  }
};
exports.deleteFromCart = async (req, res) => {
  const { id } = req.params; // Extracting Id from route parameter
  try {
    const deletedItem = await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "item deleted from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item from cart" });
  }
};
exports.updateCart = async (req, res) => {
  const { id } = req.params; // Extracting Id from route parameter

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true, //return updated product
    });
    const result = await cart.populate("product");

    if (!cart) {
      return res.status(404).json({ message: "item in cart not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Error updating product" });
  }
};
