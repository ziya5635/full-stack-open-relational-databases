let jwt = require("jsonwebtoken");
let { SECRET } = require("../utils/config");
let { User } = require("../models");

async function tokenExtractor(req, res, next) {
  const authorization = req.get("authorization");

  // no bearer token -> anonymous request, keep going
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET);

    if (decodedToken.id) {
      const user = await User.findByPk(decodedToken.id);
      if (user) {
        req.user = user; // attached only when both token and user exist
      }
    }
  } catch {
    // invalid/expired token -> treat as anonymous
  }

  next();
}

module.exports = tokenExtractor;
