// Modules
const resolve = require('path').resolve;
const webpack = require('webpack');
const validate = require('webpack-validator');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackLighthousePlugin = require('webpack-lighthouse-plugin');

// Common paths.
const PATHS = {
  img: resolve('src/static/imgs'),
  css: resolve('src/scss'),
  src: resolve('src'),
  node: resolve('node_modules'),
  docs: resolve('docs'),
  reports: resolve('reports'),
  scripts: resolve('scripts'),
  ext: resolve('src/angular-services'),
  build: resolve('build'),
  static: resolve('src/static'),
  test: '**/*.spec.js$/gi',
  wpTest: resolve('src/tests.webpack.js')
};

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';
const isDev = ENV === 'dev';
const isDeploy = ENV === 'deploy';

module.exports = (function makeWebpackConfig() {

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  const config = {};
  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? {} : {
    vendor: Object.keys(pkg.dependencies),
    app: './src/main.module.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest ? {} : {

    // Absolute output directory
    path: PATHS.build,

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: (isProd || isDeploy) ? '' : 'http://localhost:3000/',

    // Filename for entry points
    // Only adds hash in dev mode
    filename: isDev ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in dev mode
    chunkFilename: isDev ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  config.devtool = isTest ? 'inline-source-map' : 'source-map';
  config.cache = true;
  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      // JS LOADERS
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'ng-annotate!babel'
    },
    {
      test: /\.s?(a|c)ss$/,
      loader: (isDev || isTest) ? 'style!css!postcss!sass' : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    },
    /*
      // URL LOADER
      // Reference: https://github.com/webpack/url-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Like the file loader, but can return a Data Url if the file is smaller than a byte limit.
      // You can add here any file extension you want to get copied to your output
    */
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      loader: 'url?limit=25000',
      include: PATHS.img
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url'
    },
    {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loaders: ['raw']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  };

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
  // Skips node_modules and files that end with .test
  if (isTest) {

    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/,
        /\.e2e\.js$/
      ],
      loader: 'istanbul-instrumenter',
      query: {
        esModules: true
      }
    });

  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  if (isDev) {

    config.module.preLoaders.push(
      {
        test: /\.js$/,
        include: [PATHS.src],
        exclude: [PATHS.node, PATHS.ext, PATHS.build, PATHS.docs, PATHS.test, PATHS.wpTest],
        loader: 'eslint-loader',
        query: {
          cache: false,
          ignorePath: './.eslintignore',
          failOnWarning: false,
          failOnError: false
        }
      }
    );

    config.plugins.push(
      new StyleLintPlugin({
        files: '**/*.s?(a|c)ss',
        quiet: false,
        failOnError: false
      }),
      // Instrument app with LightHouse for audit.
      new WebpackLighthousePlugin({url: 'http://localhost:3000/webpack-dev-server/'})
    );

  }

  // Skip rendering index.html in test mode
  if (!isTest) {

    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/static/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].css', { disable: !isProd })
    );

  }

  // Add build specific plugins (compressing, minimizing,...)
  if (isProd || isDeploy) {

    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),
      // new webpack.IgnorePlugin(/^angular/),
      // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] }),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        mangle: false,
        supportIe8: false,
        exclude: [/\.min\.js$/gi, PATHS.test]
      }),
      // Copy assets from the static folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([
        {
          from: PATHS.static,
          to: PATHS.build
        }
      ], {
        ignore: [
          // Doesn't copy fonts folder and contents
          'fonts/**/*'
        ],
        copyUnmodified: false
      }),
      // LightHouse
      new WebpackLighthousePlugin({
        url: 'http://localhost:3000/',
        saveAssets: true,
        port: 0,
        disableDeviceEmulation: true,
        disableCPUThrottling: true,
        disableNetworkThrottling: true // Only if you're going to use real 3G
      })
    );

  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: PATHS.static,
    stats: 'minimal',
    quiet: false,
    noInfo: false,
    inline: true,
    port: 3000
  };

  return validate(config);

}());
