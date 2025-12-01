const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.get("/profile", auth, authControllers.profile);
module.exports = router;
