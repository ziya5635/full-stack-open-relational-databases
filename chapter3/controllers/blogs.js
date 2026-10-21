let { Blog, User } = require("../models");
let blogFinder = require("../middleware/blogFinder");
let { NotFoundError } = require("../lib/exceptions");
let router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

//If next was called without an argument,
//then the execution would simply move onto the next route or middleware.
//If the next function is called with an argument,
//then the execution will continue to the error handler middleware.
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw new NotFoundError("user not found while creating a blog");
    }
    let blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });
    return res.json(blog);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
    // return res.status(400).json({ error: error.message });
  }
});

router.get("/:id", blogFinder, (req, res) => {
  return res.json(req.blog);
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    let { likes } = req.body;

    if (!Number.isInteger(likes) || likes < 0) {
      return res
        .status(400)
        .json({ error: "likes must be a non-negative integer" });
    }

    req.blog.likes = likes;
    await req.blog.save();

    return res.json(req.blog);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
