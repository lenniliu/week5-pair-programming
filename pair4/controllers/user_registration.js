const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET="secretword"
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
}

const addUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password ) {
        return res.status(400).json({ error: "Username and password required" });
      }
  
      const salt = await bcrypt.genSalt(saltRounds);
      console.log('Salt generated');
  
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('Password hashed');
  
      const newUser = new User({ username, hashedPassword: hashedPassword });
      console.log('User object created');
  
      const savedUser = await newUser.save();
      console.log('User saved');

      const token = createToken(User._id);
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error('Error:', error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {
    addUser
}
