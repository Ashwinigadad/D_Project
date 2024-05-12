const mongoose = require("../models/signup");
const SignUp = mongoose.model("SignUp"); 

const signUp = async (req, res) => {
  try {
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
