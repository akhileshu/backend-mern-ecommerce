[
    {
        "quantity": 2,
        "product": {
            "id": "64da0304a2a9c3c3e88264a3",
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/1/1.jpg",
                "https://i.dummyjson.com/data/products/1/2.jpg",
                "https://i.dummyjson.com/data/products/1/3.jpg",
                "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            ],
            "deleted": true
        },
        "user": {
            "email": "viru@gmail.com",
            "password": "Pass@123",
            "role": "user",
            "addresses": [],
            "orders": [],
            "id": "64da3ccd004bf8af265c3811"
        },
        "id": "64db1ce3298a3b4d9ca49367"
    },
    {
        "quantity": 1,
        "product": {
            "deleted": false,
            "id": "64da0304a2a9c3c3e88264a4",
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 999,
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/2/1.jpg",
                "https://i.dummyjson.com/data/products/2/2.jpg",
                "https://i.dummyjson.com/data/products/2/3.jpg",
                "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
            ]
        },
        "user": {
            "email": "viru@gmail.com",
            "password": "Pass@123",
            "role": "user",
            "addresses": [],
            "orders": [],
            "id": "64da3ccd004bf8af265c3811"
        },
        "id": "64db1cfa298a3b4d9ca49369"
    }
]
const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartSchema = new Schema({
    // by using ref we get all the info of product and user 
    // qunantity,productId,userId
    // they need to be populate in controller logic function
    quantity: { type : Number, required: true},
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const virtual  = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Cart = mongoose.model('Cart',cartSchema)
