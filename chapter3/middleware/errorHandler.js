let jwt = require("jsonwebtoken");
let { DomainError } = require("../lib/exceptions");

function errorHandler(error, req, res, next) {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    const messages = error.errors.map((e) => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    const messages = error.errors.map((e) => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  // Expired must come before the generic JsonWebTokenError check,
  // because TokenExpiredError is a subclass of it.
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ error: "token expired" });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ error: "invalid token" });
  }

  if (error instanceof DomainError) {
    return res
      .status(error.constructor.status ?? 400)
      .json({ error: error.message });
  }

  // if (error.name === "NotFoundError") {
  //   return res.status(400).json({ error: error.message });
  // }

  //Any other errors
  return res.status(500).json({ error: "something went wrong" });
}

module.exports = errorHandler;
