const jwt = require("jsonwebtoken");
const Employee = require("../models/employees");

module.exports = async (req, res, next) => {
  try {
    //validate Bearer structor
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new Error("unauthenticated");
    }
    //validate token
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new Error("unauthenticated");
    }
    //verify token with secret_key
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //find user with token in database
    const authorizedUser = await Employee.findById(payload.id).select(
      "-username -password"
    );

    //validate user
    if (!authorizedUser) {
      throw new Error("unauthenticated");
    }

    //validate admin status
    if (authorizedUser.admin === false) {
      throw new Error("unauthorized");
    }

    //pass to another api request
    req.user = authorizedUser;
    next();
  } catch (err) {
    next(err);
  }
};
