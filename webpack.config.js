const path = require('path');

module.exports = {
  mode: 'production',
  entry: __dirname + '/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/i,
        use: ['url-loader']
      }
    ]
  },
  devtool: 'source-map'
};
