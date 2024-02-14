require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db');
const userRouters = require("./routers/Users")
const customMiddleware = require('./middlewares/middleware');

const port=process.env.PORT || 3001;
connectDB();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/api/users", userRouters);

app.use(customMiddleware.unknownEndpoint);

app.use(customMiddleware.errorHandler)
