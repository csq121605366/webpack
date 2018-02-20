const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'app'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '')
  },
} 