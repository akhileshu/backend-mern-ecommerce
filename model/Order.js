// order-> multiple documents[{},{},{},...]

// {
//     "items": [
//       {
//         "title": "Samsung Universe 9",
//         "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
//         "price": 1249,
//         "discountPercentage": 15.46,
//         "rating": 4.09,
//         "stock": 36,
//         "brand": "Samsung",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/3/1.jpg"
//         ],
//         "quantity": 2,
//         "user": 7,
//         "id": 4
//       }
//     ],
//     "totalAmount": 2498,
//     "totalItems": 2,
//     "user": {
//       "email": "demo@gmail.com",
//       "password": "Tx_ic#vKrLkSKx5",
//       "addresses": [
//         {
//           "name": "d",
//           "email": "d",
//           "phone": "d",
//           "street": "d",
//           "city": "d",
//           "state": "d",
//           "pinCode": "d"
//         },
//         {
//           "name": "akhilesh updahyay",
//           "email": "umapati4381@gmail.com",
//           "phone": "6281102171",
//           "street": "ring basti",
//           "city": "hyderabad",
//           "state": "telangana",
//           "pinCode": "500037"
//         }
//       ],
//       "id": 7
//     },
//     "paymentMethod": "card",
//     "selectedAddress": {
//       "name": "akhilesh updahyay",
//       "email": "umapati4381@gmail.com",
//       "phone": "6281102171",
//       "street": "ring basti",
//       "city": "hyderabad",
//       "state": "telangana",
//       "pinCode": "500037"
//     },
//     "id": 1
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