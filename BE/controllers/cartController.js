// cartController.js
const Cart = require('../models/cartModel');

const addToCart = async (req, res) => {
  try {
    const postId = req.body.postId;
    const quantity = req.body.quantity || 1;

    let cart = await Cart.findOne(); 

    if (!cart) {
      // Nếu giỏ hàng chưa tồn tại, tạo mới
      cart = new Cart({ items: [{ postId, quantity }] });
    } else {
      // Nếu giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã tồn tại chưa
      const existingItem = cart.items.find((item) => item.postId.equals(postId));

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        existingItem.quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        cart.items.push({ postId, quantity,date });
      }
    }

    await cart.save();
    res.status(200).send({ success: true, msg: "Added to Cart successfully", data: cart });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const saveCartToDatabase = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    const fullName = req.body.fullName;
    const family = req.body.family;
    const savedCart = await Cart.create({
        items: cartItems,
        fullName: fullName,
        family: family,
      });

    res.status(200).send({ success: true, msg: "Cart information saved successfully", data: savedCart });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).send({ success: true, msg: "Cart Data", data: cart });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const deletecart = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "delete Cart successfully" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { addToCart, saveCartToDatabase,getCart,deletecart };
