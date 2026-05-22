const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/ts/main.ts", // Скрипты для музыки Скрипты для входа
    index: "./src/ts-index/index.ts",
    // Вход
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/VibeCast-Studio/",
    // publicPath: "./",
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
              "...",
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
        test: /\.(c|sc|sa)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|otf|woff2?)/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
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

    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.resolve(__dirname, "src/images/img-audio"),
              destination: path.resolve(__dirname, "dist/assets/images"),
            },
          ],
        },
      },
    }),
  ],

  devServer: {
    historyApiFallback: true, // Позволяет корректно работать переходам
    hot: true,
  },
};
