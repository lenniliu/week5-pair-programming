require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const error = require("./middleware/errorMiddleware");
const notFound = require("./middleware/notFoundMiddleware");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
// Body Parser Middleware

app.use(express.json());

app.use("/api/users", require("./routers/usersRoutes"));

app.use("/api/services", require("./routers/servicesRoutes"));

app.use("/api/tours", require("./routers/toursRoutes"));

app.use(notFound);

app.use(error);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
