const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const register = async (req, res) => {
  try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

// const login = async (req, res) => {
//   try {
//     const { error } = validated(req.body);
//     if (error) return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

//     const token = user.generateAuthToken();
//     res.status(200).send({ data: token, message: "logged in successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };
const login = async (req, res) => {
  try {
    const { error } = validated(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Email hoặc Mật khẩu không hợp lệ" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Email hoặc Mật khẩu không hợp lệ" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: { token, email: user.email, id: user._id }, message: "Đăng nhập thành công" });
  } catch (error) {
    res.status(500).send({ message: "Lỗi máy chủ nội bộ" });
  }
};
const validated = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports = { register, login };
