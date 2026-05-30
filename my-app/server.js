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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Явный маршрут для страницы профиля/музыки
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "main.html"));
});

// Если вы в коде переходите на 'main.html' с расширением, то добавьте и этот вариант:
app.get("/main.html", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "main.html"));
});

// ИСПРАВЛЕНО: Берем порт от Render или 8000 для локалки
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});