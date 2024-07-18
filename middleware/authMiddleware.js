const jwt = require("jsonwebtoken");
/**
 * Middleware to authenticate the user using JWT token stored in cookies.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
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
