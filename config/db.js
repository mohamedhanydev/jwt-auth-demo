const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connected succesfully to db..");
  } catch (err) {
    console.log("Failed to connect to db...");
    throw err;
  }
};
module.exports = connectDB;
