const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PLUGINS = [
   new ngAnnotatePlugin({ add: true }),
   new HtmlWebpackPlugin({
      template: 'src/index.html'
   }),
   new ExtractTextPlugin('style-[contenthash:10].css'),
];

const config = {
   entry: {
      bundle: './src/app.module.js',
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name]-[hash:10].js',
   },
   devtool: "eval",
   plugins: PLUGINS,
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
         },
         {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
               use: [
                  {
                     loader: 'css-loader',
                     options: { importLoaders: 1 },
                  },
                  'postcss-loader',
               ],
            }),
            // exclude: /node_modules/,
         },
         {
            test: /\.html$/,
            use: 'html-loader'
         },
         {
            test: /\.(jpe?g|png|gif)$/,
            use: ['url-loader?limit=10000&name=images/[hash:10].[ext]'],
            exclude: /node_modules/
         },
         {
            test: /\.(ttf|eot|woff2?|svg)$/,
            use: ['url-loader?limit=10000&name=assets/[hash:10].[ext]'],
         },
      ]
   },
   devServer: {
      contentBase: path.join(__dirname, 'build'),
      historyApiFallback: true,
      inline: true,
      stats: {
         colors: true,
         reasons: true,
         chunks: false
      }
   },
};

module.exports = config;
