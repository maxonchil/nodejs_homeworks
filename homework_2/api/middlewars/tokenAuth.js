const jwt = require("jsonwebtoken");

const tokerVerify = token => {
  return jwt.verify(token, "secret", err => {
    if (err) {
      console.log(err.name);
      throw err;
    }
    return jwt.verify(token, "secret");
  });
};

module.exports = (req, res, next) => {
  const pageID = Number(req.params.id);
  const { JWT: token } = req.cookies;
  const { id: userID } = tokerVerify(token);

  if (pageID !== userID) {
    return res.status(403).json({ access: "rejected" });
  }
  next();
};
