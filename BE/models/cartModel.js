const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    items: [
        {
          postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
          quantity: { type: Number, default: 1 },
          title : {type : String},
        },
      ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;