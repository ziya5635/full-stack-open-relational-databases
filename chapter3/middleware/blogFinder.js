let { NotFoundError } = require("../lib/exceptions");
let { Blog } = require("../models");

async function blogFinder(req, res, next) {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    next(new NotFoundError("blog not found"));
    return;
    // return res.status(404).end();
  }
  next();
}

module.exports = blogFinder;
