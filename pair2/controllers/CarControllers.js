const Car = require("../models/Car");

const getCars = async (req, res) => {
  try {
    const car = await Car.find();
    res.json(car)
;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCar = async (req, res) => {
  try {
    const { make, model, year, color, price } = req.body;
    if (!make || !model || !year) {
      return res.status(400).json({ error: "make, model, and year number are required!" });
    }
    const newCar = new Car({ make, model, year, color, price });
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true, 
      }
    );

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCars,
  getCar,
  addCar,
  deleteCar,
  patchCar
  };
