require("dotenv").config();


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json());
const path = require("path");

const { connect } = require("./Database");
connect();



const post_route = require("./routes/postRoute");
app.use('/api', post_route)

const server = app.listen(process.env.PORT || 5000);
const portNumber = server.address().port;
console.log(`Server running on port ${portNumber}`);
