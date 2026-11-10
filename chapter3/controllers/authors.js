let { Blog } = require("../models");
let { sequelize } = require("../utils/db");
let router = require("express").Router();

router.get("/", async function (req, res, next) {
  try {
    let blogs = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("SUM", sequelize.col("likes")),
            0,
          ),
          "likes",
        ],
      ],
      group: "author",
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
