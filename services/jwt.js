const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT, { expiresIn: "1h" });
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT);
};
module.exports = { generateToken, verifyToken };
