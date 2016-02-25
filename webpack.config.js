var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/entry.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    alias: {
      Row: 'Row.jsx',
      Node: 'Node.jsx',
      Grid: 'Grid.jsx',
      config: 'config.jsx',
      style: 'scss/style.scss',
      react: 'libs/react/react.js',
      MineSweeper: 'MineSweeper.jsx',
      reactDom: 'libs/react/react-dom.js',
      lodash: 'libs/lodash/dist/lodash.js'
    }
  },
  module: {
    loaders: [{
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    ]
  }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
      },{
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./src/scss")]
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
};