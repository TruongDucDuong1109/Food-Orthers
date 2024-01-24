const express = require("express");
const auth_route = express();
const bodyParser = require("body-parser");
const authController = require("../controllers/authController");

auth_route.use(bodyParser.json());
auth_route.use(bodyParser.urlencoded({ extended: true }));

auth_route.post('/sign', authController.register);
auth_route.post('/login', authController.login);


module.exports = auth_route;
