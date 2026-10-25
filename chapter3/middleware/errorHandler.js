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

  if (error.name === "NotFoundError") {
    return res.status(400).json({ error: error.message });
  }
  //Any other errors
  return res.status(500).json({ error: "something went wrong" });
}

module.exports = errorHandler;
