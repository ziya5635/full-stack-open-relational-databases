let { Model, DataTypes } = require("sequelize");
let { sequelize } = require("../utils/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: { args: [2], msg: "at least 2 characters" } },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { isUrl: { msg: "invalid url given" } },
    },
    author: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  },
);

// Blog.sync(); //create the table if not already existed

module.exports = Blog;
