const path = require('path');
module.exports = {
  entry: {
    app: path.join(__dirname, './src/app.ts')
  },
  output: {
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
};