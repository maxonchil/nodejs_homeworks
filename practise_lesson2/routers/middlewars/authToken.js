const jwt = require("jsonwebtoken");

module.exports = (req, resp, next) => {
  const token = req.headers["authorization"];

  jwt.verify(token, "secret", err => {
    if (err) {
      resp.status(403).json({ access: "rejected" });
      throw err;
    }
    next();
  });
};
