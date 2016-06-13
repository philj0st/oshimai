module.exports = {
  devtool: "eval-source-map",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './public/'
  },
  devServer: {
    contentBase: "public/",
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + "/src/",
        loader: "babel-loader"
      }
    ]
  }
}
