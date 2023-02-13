const port = 8080;
const express = require("express");
const cors = require("cors");
const app = express();

const menuRouter = require("./routes/menu.route.js");
const proRouter = require("./routes/product.route.js");

app.use(cors());
app.use(express.json());

app.use("/api", menuRouter);
app.use("/api", proRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome Rest API" });
});

app.get("", (req, res) => {
  res.status(200).send("<h1>Hello mfckr</h1>");
});

app.listen(port, () => console.log("server is running" + port));
