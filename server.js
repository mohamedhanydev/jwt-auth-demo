require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const auth = require("./routes/auth");
app.use(express.json());

const startApp = async () => {
  try {
    await connectDB();
    app.use("/api/auth", auth);
    app.listen(process.env.PORT, () => {
      console.log(`started listening on port:${process.env.PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};
startApp();
