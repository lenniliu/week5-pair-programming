const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET="secretword"
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    const token = createToken(newUser._id);

    res.status(200).json({ message: "Authentication successful", token });
  };

module.exports = {
    loginUser
}
