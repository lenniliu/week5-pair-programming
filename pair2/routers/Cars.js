const express = require("express")
const {
    getCars,
    getCar,
    addCar,
    deleteCar,
    patchCar
} = require("../controllers/CarControllers")

const router = express.Router()

// GET all cars
router.get('/', getCars)

// GET one car
router.get('/:id', getCar)

// POST new car
router.post('/', addCar)

// DELETE car
router.delete('/:id', deleteCar)

// Update car PATCH 
router.patch('/:id', patchCar)

module.exports = router
