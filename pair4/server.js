const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  hashedPassword: String,
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://pairprogramming5:WMJvL7j5yNEcDHGR@pairprogramming5.rrwt3br.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


// Endpoint for user registration
app.post("/api/users", async (req, res) => {
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
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error:', error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Endpoint to authenticate a user
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  res.status(200).json({ message: "Authentication successful" });
});

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

// Endpoint to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
