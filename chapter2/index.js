require("dotenv").config();
let { Sequelize, Model, DataTypes } = require("sequelize");
let express = require("express");
let app = express();
app.use(express.json());

let sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

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
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    timestamps: false,
    modelName: "blog",
  },
);

Blog.sync(); //create the table if not already existed

app.get("/api/blogs", async (req, res) => {
  let blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    let blog = await Blog.create({ ...req.body });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }
    await blog.destroy();
    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// app.get("/api/blogs/:id", async (req, res) => {
//   let blog = await Blog.findByPk(req.params.id);
//   if (blog) {
//     res.json(blog);
//   } else {
//     res.status(404).end();
//   }
// });

// app.put("/api/blogs/:id", async (req, res) => {
//   let blog = await Blog.findByPk(req.params.id);
//   if (blog) {
//     // note.important = req.body.important;
//     blog.likes += 1;
//     await blog.save();
//     res.json(blog);
//   } else {
//     res.status(404).end();
//   }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
