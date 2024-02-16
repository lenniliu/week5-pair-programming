const User = require("../models/user");

const getUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  };

module.exports = {
    getUsers
}
