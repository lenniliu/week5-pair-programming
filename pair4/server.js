const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userRouters = require("./routers/users")
const protectedRoute =  require("./routers/protectedRoutes")

const app = express();
app.use(express.json());

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://pairprogramming5:WMJvL7j5yNEcDHGR@pairprogramming5.rrwt3br.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/protectedRoutes", protectedRoute);

app.use("/api/users", userRouters);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


