const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const PRODUCTION = process.env.NODE_ENV === 'production';
const VENDOR_LIBS = ['angular', 'angular-messages', 'angular-ui-router', 'mdi'];

const PLUGINS = [
  new ngAnnotatePlugin({ add: true }),
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new webpack.DefinePlugin ({
    PRODUCTION: JSON.stringify(PRODUCTION)
  }),
  new ExtractTextPlugin('style-[contenthash:10].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest']
  })
];

// if(PRODUCTION) {
//   PLUGINS.push(
//     new ExtractTextPlugin('style-[contenthash:10].css'),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: ['vendor', 'manifest']
//     })
//   );
//   console.log("Inside Prod");
// }


// const CSS_IDENTIFIER = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';
// const CSS_LOADER = PRODUCTION
// ?   ExtractTextPlugin.extract({
//   use: ['css-loader', 'postcss-loader']
// })
// :   ['style-loader', 'css-loader', 'postcss-loader'];
//
//
// const ENTRY = PRODUCTION
// ?   { bundle: './src/app.module.js',
// vendor: VENDOR_LIBS }
// :   { bundle: './src/app.module.js' };
//
//
// const SOURCE_MAP = PRODUCTION
// ?   'cheap-module-source-map'
// :   'cheap-eval-source-map';


const config = {
  entry: {
    bundle: './src/app.module.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[hash:10].js',
  },
  // devtool: "source-map",
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
        use: ExtractTextPlugin.extract([
          'style-loader',
          'css-loader',
          // 'postcss-loader'
        ]),
        // exclude: /node_modules/,
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
