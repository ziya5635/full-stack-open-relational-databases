let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let router = require("express").Router();

let { SECRET } = require("../utils/config");
let { User } = require("../models");
let { UnauthenticatedError } = require("../lib/exceptions");

router.post("/", async (request, response) => {
  let { username, password } = request.body;

  if (!username || !password) {
    throw new UnauthenticatedError("invalid username or password");
  }

  let user = await User.findOne({ where: { username } });

  // bcrypt.compare is async and returns false (does not throw) for a wrong
  // password. Guard against users with no password set (password is nullable).
  const passwordCorrect = user?.password
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!passwordCorrect) {
    throw new UnauthenticatedError("invalid username or password");
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
