const path = require('path');
module.exports = {
  entry: {
    app: path.join(__dirname, 'app')
  },
  output: {
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}