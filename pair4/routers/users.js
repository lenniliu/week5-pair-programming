const express = require("express")
const { addUser } = require("../controllers/user_registration")
const { loginUser } = require("../controllers/user_login")
const { getUsers } = require("../controllers/get_users")
const { deleteUser } = require("../controllers/delete_user")

const router = express.Router()

//post new user
router.post("/", addUser)

//post login
router.post("/login", loginUser)

//get users
router.get("/", getUsers)

//delete user
router.delete("/:id", deleteUser)

module.exports = router