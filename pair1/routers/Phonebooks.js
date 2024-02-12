const express = require("express")
const {
    getPhonebooks,
    getPhonebook,
    addPhonebook,
    deletePhonebook,
    patchPhonebook
} = require("../controllers/PhonebookControllers")

const router = express.Router()

// GET all phonebooks
router.get('/', getPhonebooks)

// GET a single phonebook
router.get('/:id', getPhonebook)

// POST a new phonebook
router.post('/', addPhonebook)

// DELETE a phonebook
router.delete('/:id', deletePhonebook)

// Update phonebook using PATCH 
router.patch('/:id', patchPhonebook)

module.exports = router