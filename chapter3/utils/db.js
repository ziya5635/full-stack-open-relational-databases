let Sequelize = require("sequelize");
let { DATABASE_URL } = require("./config");

let sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
}

module.exports = { connectToDatabase, sequelize };
