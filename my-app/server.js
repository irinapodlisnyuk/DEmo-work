const express = require("express");
const cors = require("cors");
const webpack = require("webpack");
const config = require("./webpack.config.js");
const routes = require("./routes/routes.js");

const app = express();
const compiler = webpack(config);

app.use(cors());
app.use(express.json()); // Заменяет bodyParser


// Webpack Middleware для сборки фронтенда на лету
app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath || "/",
  }),
);

// API маршруты
app.use("/api", routes);

// Статика
app.use(express.static("./src"));
const path = require('path');
// Делаем папку src/audio доступной по адресу /audio
app.use("/audio", express.static(path.join(__dirname, "src/audio")));
// app.use("/audio", express.static("./src/audio"));

// app.use("/images", express.static(path.join(__dirname, "src/images")));
// // Раздаем папку с музыкой (исправляем опечатку /audio)
// app.use("/audio", express.static(path.join(__dirname, "src/audio")));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
