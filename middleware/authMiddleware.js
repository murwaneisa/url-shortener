const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login"); // is the user is not logged in redirect to the login page
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};
