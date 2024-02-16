const User = require("../models/user");

const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  };

module.exports = {
    deleteUser
}
