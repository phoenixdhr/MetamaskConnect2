// "path" ya esta disponible en node, por lo que no requiere una instalcion
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")


// se crea un objeto exports, para exportarlo con una configuracion deseada

module.exports = {
  entry: "./src/index.js", // punto de entrada
  output: {
    path: path.resolve(__dirname, "dist"), //retorna la ruta del directorio y el archivo donde se guarda main.js
    filename: "main.js",
  }, // punto de salida

  resolve: {
    extensions: [".js"], // extenciones con las que va trabajar el proyecto
    // fallback: {
    //   //*****/
    //   fs: true, //*****/
    //   path: false, //*****/
    //   util: false, //*****/
    // }, //*****/
  },

  module: {
    rules: [
      {
        test: /\.m?js$/, //permite saber que tipo de extensiones e va usar
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      inject: "body", // hace insercion de los elementos
      template: "./public/index.html", // ruta del template, que sera transformado a un nuevo archivo que tendra por nombre lo que se indique en filename
      filename: "./index.html", //resultado del file, o la transformacion del template
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new Dotenv(),

    // new CopyPlugin({
    //     patterns: [
    //       {
    //         flatten: true,
    //         from: './src/*',
    //         globOptions: {
    //           ignore: ['**/*.js'],
    //         },
    //       },
    //     ],
    //   }),

  ],
};
