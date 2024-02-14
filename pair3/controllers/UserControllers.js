const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, age } = req.body;
    if (!username || !email || !password || !firstName || !lastName || !age) {
      return res.status(400).json({ error: "Name and phone number are required!" });
    }
    const newUser = new User({ username, email, password, firstName, lastName, age });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true, 
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    patchUser,
  };
