var webpack = require('webpack')
var DotEnvEmitter = require('./dotenv-emitter')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: 'build',
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new WriteFilePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    // new DotEnvEmitter({
    //   env: require(DotEnvEmitter.envfiles('dev'))
    // })
  ]
}
