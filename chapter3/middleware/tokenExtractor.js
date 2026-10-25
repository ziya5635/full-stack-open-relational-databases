let jwt = require("jsonwebtoken");
let { SECRET } = require("../utils/config");
let { User } = require("../models");
const { UnauthenticatedError } = require("../lib/exceptions");

async function tokenExtractor(req, res, next) {
  const authorization = req.get("authorization");

  // no bearer token -> anonymous request, keep going
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET);
    if (decodedToken.id) {
      let user = await User.findByPk(decodedToken.id);
      if (user) {
        req.user = user.toJSON(); // attached only when both token and user exist
      }
    } else {
      throw new UnauthenticatedError("user not found");
    }
  } catch (error) {
    next(error);
  }

  next();
}

module.exports = tokenExtractor;
