// module.exports - это аналог export'ов для NodeJS.
// Эта конструкция похожа на export default.

const HtmlWebpackPlugin = require("html-webpack-plugin");
//const FileManagerPlugin = require("filemanager-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
//const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin').default || require('svg-spritemap-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    main: "./src/ts/main.ts", // Скрипты для музыки Скрипты для входа
    index: "./src/ts-index/index.ts",
   // Вход
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    // publicPath: "/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              "...", // Оставляет обработку <img>, которые у вас уже работают
              {
                tag: "use",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.(c|sc|sa)ss$/i, // Обрабатывает .sass и .scss
        use: [
          MiniCssExtractPlugin.loader, // 3. Извлекает CSS в отдельные файлы
          "css-loader", // 2. Превращает CSS в CommonJS
          "sass-loader", // 1. Компилирует SCSS в CSS
        ],
      },
      {
        test: /\.(ttf|otf|woff2?)/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash][ext]", // Картинки будут в dist/assets/images/
        },
      },
      // {
      //   test: /\.scss$/i,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    //    new SVGSpritemapPlugin('src/images/sprite*.svg', { // Путь к вашим иконкам
    //   output: {
    //     filename: 'assets/sprite.svg', // Путь и имя файла в папке dist
    //     svgo: true, // Оптимизация SVG (удаление лишнего кода)
    //   },
    //   sprite: {
    //     prefix: 'icon-', // Добавит префикс к id иконок (будет icon-name)
    //     generate: {
    //       title: false, // Отключает лишние теги внутри спрайта
    //     },
    //   },
    // }),
    //    new HtmlWebpackInlineSVGPlugin({
    //   runPreEmit: true, // Позволяет плагину работать до записи файлов на диск
    // }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // Создаст отдельные main.css и second.css
    }),

    // Страница входа
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"], // Подключает только index.bundle.js
    }),
    // Страница профиля
    new HtmlWebpackPlugin({
      template: "./src/main.html",
      filename: "main.html",
      chunks: ["main"], // Подключает только main.bundle.js
    }),
  ],
  devServer: {
    historyApiFallback: true, // Позволяет корректно работать переходам
    hot: true,
  },

  // devServer: {
  //   static: {
  //     directory: "./src",
  //   },
  //   hot: true,
  //   proxy: {
  //     "/api": "http://localhost:8000",
  //   },
  // },
};
