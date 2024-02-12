const Phonebook = require("../models/Phonebook");

const getPhonebooks = async (req, res) => {
  try {
    const phonebooks = await Phonebook.find();
    res.json(phonebooks)
;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPhonebook = async (req, res) => {
  try {
    const phonebook = await Phonebook.findById(req.params.id);
    if (!phonebook) {
      return res.status(404).json({ error: "Phonebook not found" });
    }
    res.json(phonebook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addPhonebook = async (req, res) => {
  try {
    const { name, phoneNumber, email, address } = req.body;
    if (!name || !phoneNumber) {
      return res.status(400).json({ error: "Name and phone number are required!" });
    }
    const newPhonebook = new Phonebook({ name, phoneNumber, email, address });
    const savedPhonebook = await newPhonebook.save();

    res.status(201).json(savedPhonebook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePhonebook = async (req, res) => {
  try {
    const phonebook = await Phonebook.findByIdAndDelete(req.params.id);
    if (!phonebook) {
      return res.status(404).json({ error: "Phonebook not found" });
    }
    res.json({ message: "Phonebook deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchPhonebook = async (req, res) => {
  try {
    const phonebook = await Phonebook.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true, 
      }
    );

    if (!phonebook) {
      return res.status(404).json({ error: "Phonebook not found" });
    }

    res.json(phonebook);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getPhonebooks,
    getPhonebook,
    addPhonebook,
    deletePhonebook,
    patchPhonebook,
  };
