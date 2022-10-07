const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");

const app = express();

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://dewei1997:sei38dewei@cluster0.xgddubj.mongodb.net/test";

mongoose.connect(MONGO_URI);

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
