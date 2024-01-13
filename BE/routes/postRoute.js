const express = require("express");
const post_route = express();
const bodyParser = require("body-parser");

post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

post_route.use(express.static( "public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/postImages'));
    },
    
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname
        cb(null,name, function (err, success) {
            if((err)) {
                console.log(err);
            }
        });
    },
});

const upload = multer({ storage: storage });

const postController = require("../controllers/postController");

post_route.post('/create-post',upload.single('image'), postController.createPost);

post_route.get('/get-post', postController.getPost);

post_route.get('/delete-post/:id', postController.deletePost);

post_route.post('/update-post/',upload.single('image'), postController.updatePost);
module.exports = post_route;