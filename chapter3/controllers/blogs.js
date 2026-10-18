let { Blog } = require("../models");

let router = require("express").Router();

async function blogFinder(req, res, next) {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
}

router.get("/", async (req, res) => {
  let blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    let blog = await Blog.create({ ...req.body });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  try {
    // const blog = await Blog.findByPk(req.params.id);
    // if (!blog) {
    //   return res.status(404).json({ error: "blog not found" });
    // }
    await req.blog.destroy();
    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/:id", blogFinder, (req, res) => {
  return res.json(req.blog);
  // let blog = await Blog.findByPk(req.params.id);
  // if (blog) {
  //   res.json(blog);
  // } else {
  //   res.status(404).end();
  // }
});

router.put("/:id", blogFinder, async (req, res) => {
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
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
