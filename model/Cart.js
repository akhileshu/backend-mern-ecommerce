// [
//   {
//     quantity: 2,
//     product: {},type: Schema.Types.ObjectId
//     user: {},type: Schema.Types.ObjectId
//     id: "64db1ce3298a3b4d9ca49367",
//   },
// ];
const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  // by using ref we get all the info of product and user
  // qunantity,productId,userId
  // they need to be populate in controller logic function
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", cartSchema);
