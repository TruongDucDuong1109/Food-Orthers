const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const post = new User({
          email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 5),
        password: req.body.password,
        });
    
        const postData = await post.save();
        console.log("Dữ liệu đã lưu:", postData);
        res.status(200).send({ success: true, msg: "Post Data", data: postData });
      } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
      }
};

const getAuth = async (req, res) => {
    try {
      const posts = await User.find({});
      res.status(200).send({ success: true, msg: "Post Data", data: posts });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  };

module.exports = { register, getAuth };
