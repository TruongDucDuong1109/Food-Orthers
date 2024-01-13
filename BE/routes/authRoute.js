const express = require("express");
const auth_route = express();
const bodyParser = require("body-parser");
const authenticateToken = require('../middleware/authMiddleware');
const authController = require("../controllers/authController");

auth_route.use(bodyParser.json());
auth_route.use(bodyParser.urlencoded({ extended: true }));

auth_route.post('/register', authController.register);
auth_route.get('/get-auth', authController.getAuth);

module.exports = auth_route;
