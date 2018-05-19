const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

console.log(ExtractTextPlugin.extract({
  fallback: 'style-loader',
          use: 'css-loader',
}));

module.exports = {
  mode: 'development',
  
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static',
    filename: '[name].[chunkhash:8].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }).concat([
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              publicPath: './images',
              outputPath: './images',
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'raw-loader',
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].[md5:contenthash:hex:8].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};