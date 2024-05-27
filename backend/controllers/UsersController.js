import User from "../models/User";

const UsersController = {
  login: (req, res) => {
    return res.json({ msg: "user login" });
  },
  register: (req, res) => {
    return res.json({ msg: " user register" });
  },
};

module.exports = UsersController;
