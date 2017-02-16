// eslint-disable-next-line no-underscore-dangle
const webpack = require('webpack');

const webpackConfig = {
  name: 'repro',
  target: 'web',
  context: __dirname,
  devtool: 'cheap-eval-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {rules: []},
  plugins: [],
};

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react'],
      },
    }],
  },
];

const cssLoader = {
  loader: 'css-loader',
  options: {
    //
    // Uncommenting the sourceMap line below breaks the build!
    //
    // sourceMap: true,
    minimize: false,
  },
};

const cssModulesLoader = Object.assign({}, cssLoader, {
  options: Object.assign({}, cssLoader.options, {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  }),
});

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};


const componentsPath = require('path').join(__dirname, 'lib/components');

webpackConfig.module.rules.push({
  test: /\.scss$/,
  include: componentsPath,
  use: [{loader: 'style-loader'}, cssModulesLoader, sassLoader],
});

module.exports = webpackConfig;
