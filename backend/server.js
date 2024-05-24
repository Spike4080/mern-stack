const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipesRoutes = require("./routes/recipes");
const mongoose = require("mongoose");
const app = express();

const mongoURL =
  "mongodb+srv://spike:test123@mern-cluster.ix9jcsc.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster";

app.use(express.json()); //parse json data

app.use(morgan("dev"));
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is running on port" + process.env.PORT);
  });
  ``;
});

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", recipesRoutes);
