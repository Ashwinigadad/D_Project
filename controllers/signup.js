const mongoose = require("../models/signup");
const SignUp = mongoose.model("SignUp"); // Adjust the model name as needed

const signUp = async (req, res) => {
  try {
    // User not found, create a new entry
    const newEntry = new SignUp({
      email: req.body.email,
      password: req.body.password,
    });

    await newEntry.save();
    res.json("signup");
  } catch (err) {
    console.error("Error handling entry/exit:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = signUp;
