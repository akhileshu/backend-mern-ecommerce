const { Cart } = require("../model/Cart");

// exports.fetchCartByUser = async (req, res) => {
//     // if want to access userid form route parameter
//     // url ->http://localhost:8080/cart/64da3ccd004bf8af265c3811
//     // /cart is already added in base path

// router.post("/", addToCart).get("/:userId", fetchCartByUser);
//     const { userId } = req.params; // Extracting userId from route parameter
//     try {
//         // populate -> fetch all info of product and user
//         const cartItems = await Cart.find({ user: userId }).populate('user').populate('product');
//         res.status(200).json(cartItems);
//     } catch (error) {
//         res.status(400).json({ error: 'Error fetching cart by user id' });
//     }
// };

exports.fetchCartByUser = async (req, res) => {
  // url ->http://localhost:8080/cart/?user=64da3ccd004bf8af265c3811
  const { user } = req.query; // Extracting userId from query object
  try {
    // populate -> fetch all info of product and user
    const cartItems = await Cart.find({ user: user })
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
    const cart = new Cart(req.body);
    const doc = await cart.save();
    const result = await doc.populate('product')
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Error adding to cart" });
  }
};
exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;// Extracting Id from route parameter
  try {
    const deletedItem = await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "item deleted from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item from cart" });
  }
};
exports.updateCart = async (req, res) => {
    const { id } = req.params;// Extracting Id from route parameter
  
    try {
      const cart = await Cart.findByIdAndUpdate(id, req.body, {
        new: true, //return updated product
      });
      const result = await cart.populate('product')

      if (!cart) {
        return res.status(404).json({ message: "item in cart not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: "Error updating product" });
    }
  };
