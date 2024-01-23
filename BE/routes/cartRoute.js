// cart_route.js
const express = require("express");
const cart_route = express.Router();
const bodyParser = require("body-parser");
const cartController = require("../controllers/cartController");

cart_route.use(bodyParser.json());
cart_route.use(bodyParser.urlencoded({ extended: true }));

cart_route.post('/add', cartController.addToCart);
cart_route.post('/save', cartController.saveCartToDatabase);
cart_route.get('/getcart', cartController.getCart);
cart_route.get('/delete-cart/:id', cartController.deletecart);

module.exports = cart_route;
