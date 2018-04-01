const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
     entry: {
       index : './app.js',
       about : './about.js'
     },
     output: {
        filename: '[name]/bundle.js',
        // Output path using nodeJs path module
        path: path.resolve(__dirname, 'dist')
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          chunks : ['index'],
          template: 'index.html',
          //inject : 'head', //inject : 'true' || 'head' || 'body' || 'false', //where the js file will be
          // minify:  {
          //   removeAttributeQuotes: true
          // },
          // cache : true
        }),
        new HtmlWebpackPlugin({
          filename : 'about.html',
         chunks : ['about'],
          template: 'about.html'
        }),
        new MiniCssExtractPlugin({
          filename: "./assets/css/[name].css",
          //chunkFilename: "[id].css"
        })
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['env']
              } 
            }
          },
          {
            test: /\.html$/,
            use: [
              'html-loader'
            ]
          },
          {
            test : /\.scss$/,
            include : [path.resolve(__dirname, 'src', 'assets', 'scss')],
            use : [
              MiniCssExtractPlugin.loader,
              "css-loader",
              'sass-loader'
            ]
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './assets/media/',
                 // publicPath: './assets/media/'
                }
              }
            ]
          }
        ]
      },
      devServer : {
        contentBase: path.resolve(__dirname, "./dist/assets/media"),
        compress: true,
        port: 4000,
        stats: 'errors-only',
        open: true
      },
      //devtool: 'inline-source-map'
};