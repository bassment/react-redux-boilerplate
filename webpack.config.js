const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_ROOT = path.resolve(__dirname, 'src');

const StylusExtractTextPluginParams = JSON.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]__[hash:base64:5]',
});

const SvgSpriteLoaderParams = JSON.stringify({
  name: '[name]_[hash:base64:5]',
  prefixize: true,
});

const isVendor = opts => (
  opts.userRequest &&
  opts.userRequest.indexOf('node_modules') >= 0
);

module.exports = ({ reload } = {}) => {
  const config = {
    entry: {
      main: path.resolve(__dirname, 'src/main.jsx'),
    },
    devtool: '#cheap-source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      pathinfo: true,
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel',
            },
          ],
        },
        {
          test: /\.styl$/,
          include: APP_ROOT,
          use: ExtractTextPlugin.extract({
            fallback: 'style',
            use: [
              {
                loader: 'css',
                options: StylusExtractTextPluginParams,
              },
              {
                loader: 'postcss',
                options: {
                  plugins() {
                    return [
                      autoprefixer({ browsers: ['last 3 versions'] }),
                    ];
                  },
                },
              },
              {
                loader: 'stylus',
                options: {
                  import: [
                    path.resolve(APP_ROOT, 'styles/_functions.styl'),
                    path.resolve(APP_ROOT, 'styles/_var.styl'),
                  ],
                },
              },
            ],
          }),
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite',
          options: SvgSpriteLoaderParams,
        },
      ],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      moduleExtensions: ['-loader'],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
      extensions: ['.js', '.jsx'],
      alias: {
        components: path.resolve(APP_ROOT, 'components'),
        actions: path.resolve(APP_ROOT, 'actions'),
        reducers: path.resolve(APP_ROOT, 'reducers'),
        styles: path.resolve(APP_ROOT, 'styles'),
        config: path.resolve(APP_ROOT, 'config'),
        helpers: path.resolve(APP_ROOT, 'helpers'),
        mockData: path.resolve(APP_ROOT, 'mockData'),
        lib: path.resolve(APP_ROOT, 'lib'),
        svg: path.resolve(APP_ROOT, 'svg'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.tpl.html'),
        inject: 'body',
        filename: 'index.html',
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons/commons.js',
        chunks: [],
        minChunks: isVendor,
      }),
    ],
    node: {
      fs: 'empty',
    },
  };

  if (reload) {
    config.plugins.push(new LiveReloadPlugin({
      appendScriptTag: true,
    }));
  }

  return config;
};
