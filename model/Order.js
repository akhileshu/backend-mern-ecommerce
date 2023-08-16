// order-> multiple documents[{},{},{},...]

// {
//     "items": [
//       {
//        // objects of all products  
//       }
//     ],
//     "totalAmount": 2498,
//     "totalItems": 2,
//     user: {},type: Schema.Types.ObjectId,
//     "paymentMethod": "card",
//     "selectedAddress": {},
//     id: "64db1ce3298a3b4d9ca49367",
//   }

// ex :order = {
//   items,
//   totalAmount,
//   totalItems,
//   user:user.id,
//   paymentMethod,
//   selectedAddress,
//   status: "pending",
// }
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  //TODO:  we can add enum types -> card/cash
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'pending' },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});

const virtual = orderSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model('Order', orderSchema);