let jwt = require("jsonwebtoken");
let router = require("express").Router();

let { SECRET } = require("../utils/config");
let User = require("../models");

router.post("/", async (request, response) => {
  let body = request.body;

  let user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  let userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
