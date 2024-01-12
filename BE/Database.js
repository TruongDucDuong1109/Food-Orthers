require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.SERVER_MONGO_URI;

console.log("URI from .env:", uri);

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error while connecting to MongoDB:", error.message);
    }
};

module.exports = { connect };
