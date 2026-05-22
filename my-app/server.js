const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/routes.js");

const app = express();

app.use(cors());
app.use(express.json()); // Заменяет bodyParser

// Использовать webpack-dev-middleware ТОЛЬКО локально, чтобы сервер на Render не падал
if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const config = require("./webpack.config.js");
  const compiler = webpack(config);
  
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: config.output.publicPath || "/",
    })
  );
}

// API маршруты
app.use("/api", routes);

// Раздача статических файлов (фронтенд после npm run build теперь лежит в dist)
app.use(express.static(path.join(__dirname, "dist")));
app.use("/audio", express.static(path.join(__dirname, "src/audio")));

// ИСПРАВЛЕНО: Берем порт от Render или 8000 для локалки
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});