const jwt = require("jsonwebtoken");

const parseCookie = cookie => cookie.split("=")[1];
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
  const { id: userID } = tokerVerify(parseCookie(req.headers["cookie"]));
  if (pageID !== userID) {
    return res.status(403).json({ access: "rejected" });
  } 
  next();
};
