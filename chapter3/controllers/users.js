let router = require("express").Router();
let { NotFoundError } = require("../lib/exceptions");
let { User, Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: {
        model: Blog,
        attributes: {
          exclude: ["userId"],
        },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body); // hook hashes password
    let { password: _pw, ...safeUser } = user.toJSON();
    res.json(safeUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        attributes: {
          exclude: ["userId"],
        },
      },
    });
    if (user) {
      res.json(user);
    } else {
      next(new NotFoundError("user not found"));
      // res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) {
      return next(new NotFoundError("user not found"));
    }
    user.name = req.body.name;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
