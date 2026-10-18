function errorHandler(error, req, res, next) {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "NotFoundError") {
    return res.status(400).json({ error: error.message });
  }

  // Any other error → 500 Internal Server Error
  return res.status(500).json({ error: "something went wrong" });
}

module.exports = errorHandler;
