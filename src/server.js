const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../src/routers/user.router");
const postRouter = require("../src/routers/post.router");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResfulApi",
  });
});

module.exports = app;
