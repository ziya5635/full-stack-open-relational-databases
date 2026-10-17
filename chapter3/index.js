require("dotenv").config();
let express = require("express");
let { PORT } = require("./utils/config");
let { connectToDatabase } = require("./utils/db");
let blogsRouter = require("./controllers/blogs");
let app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);

async function start() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
start();
