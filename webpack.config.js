const path = require('path')

module.exports = {
  entry: {
    main: './src/Main.js'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      // Stylesheets
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // Font Definitions
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/',    // where the fonts will go
            publicPath: '../'       // override the default path
          }
        }]
      },
    ]
  }
}