const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const webpack = require("webpack");

// 1. Сначала импортируем конфигурацию
const config = require('./webpack.config.js'); 

// 2. Затем создаем компилятор
const compiler = webpack(config);

// 3. ЗАТЕМ создаем само приложение app (ЭТО ДОЛЖНО БЫТЬ ВЫШЕ ЧЕМ app.use)
const app = express(); 

// 4. ТЕПЕРЬ можно использовать app.use
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath || '/'
}));

// 5. Раздаем статику из папки dist
// app.use(express.static(__dirname, 'dist')));
//const PORT = 8000;
const PORT = process.env.PORT || 8000;

 app.use(express.static('./src'));

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
