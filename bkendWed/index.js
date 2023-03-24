const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const menuRouter = require("./routes/menu.route.js");
const proRouter = require("./routes/product.route.js");
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Database connected succesfully"))
  .catch((err) => console.log(err));

app.use("/api", productRoute);
app.use("/api", categoryRoute);

app.get("/api", (req, res) => {
  res.json("Welcome to API");
});

app.listen(port, () => console.log("server is running" + port));
