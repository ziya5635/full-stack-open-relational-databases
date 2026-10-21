require("dotenv").config();
let express = require("express");
let { PORT } = require("./utils/config");
let { connectToDatabase } = require("./utils/db");
let { blogsRouter, loginRouter, usersRouter } = require("./controllers");
let errorHandler = require("./middleware/errorHandler");
let { syncModels } = require("./models");
const tokenExtractor = require("./middleware/tokenExtractor");

let app = express();

app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

async function start() {
  await connectToDatabase();
  await syncModels();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
start();
