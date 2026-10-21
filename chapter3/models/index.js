let Blog = require("./blog");
let User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

async function syncModels() {
  await User.sync({ alter: true }); //first create User, since Blog is dependent on it
  await Blog.sync({ alter: true });
}

module.exports = {
  Blog,
  User,
  syncModels,
};
