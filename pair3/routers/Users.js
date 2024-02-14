const express = require("express")

const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    patchUser
} = require("../controllers/UserControllers")

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', addUser)

// DELETE a user
router.delete('/:id', deleteUser)

// Update user using PATCH 
router.patch('/:id', patchUser)

module.exports = router
