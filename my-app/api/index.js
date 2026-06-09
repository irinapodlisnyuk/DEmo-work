const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/routes.js");

const app = express();

app.use(cors());
app.use(express.json()); // Заменяет bodyParser

// Использовать webpack-dev-middleware ТОЛЬКО локально
if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const config = require("../webpack.config.js");
  const compiler = webpack(config);
  
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: config.output.publicPath || "/",
    })
  );
}

app.use("/api", routes);

// Раздача статических файлов
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/audio", express.static(path.join(__dirname, "../src/audio")));

module.exports = app;