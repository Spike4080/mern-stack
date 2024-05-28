const User = require("../models/User");
let bcrypt = require("bcrypt");

const UsersController = {
  login: (req, res) => {
    return res.json({ msg: "user login" });
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
};

module.exports = UsersController;
