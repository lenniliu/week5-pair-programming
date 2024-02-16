const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    hashedPassword: String,
  });
  
  // Create a Mongoose model based on the schema
  const User = mongoose.model("User", userSchema);

module.exports = User;