const mongoose = require("../models/libraryEntryExit");
const library = mongoose.model("libraryHistory");

const libraryEntryExit = async (req, res) => {
  try {
    const user = await library.findOne({ email: req.body.email }).sort({ loginTime: -1 });
    const utcTime = new Date();

    if (!user) {
      // User not found, create a new entry
      const newEntry = new library({
        email: req.body.email,
        history: [{ loginTime: new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000) }],
      });
      await newEntry.save();
      res.status(200).json({ message: "Entry recorded successfully" });
    } else {
      if (!user.history[user.history.length - 1].logoutTime) {
        // User is checked in, record exit time
        user.history[user.history.length - 1].logoutTime = new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000);
        await user.save();
        res.status(200).json({ message: "Exit recorded successfully" });
      } else {
        // User is checked out, log in again
        user.history.push({ loginTime: new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000) });
        await user.save();
        res.status(200).json({ message: "Logged in again successfully" });
      }
    }
  } catch (err) {
    console.error("Error handling entry/exit:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = libraryEntryExit;
