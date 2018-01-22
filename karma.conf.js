// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],
    // Test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'coverage', 'spec', 'junit'
    ],

    files: [
      // Grab all files in the app folder that contain .spec.
      'src/tests.webpack.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },
    // List of files to exclude.
    exclude: [],
    // Enable / disable colors in the output (reporters and logs).
    colors: true,
    // Level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // Enable / disable watching file and executing tests whenever any file changes.
    autoWatch: true,
    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,
    port: 8979,
    coverageReporter: {
      dir: 'reports',
      reporters: [
        { type: 'cobertura', subdir: 'coverage', file: 'coverage.xml' }
      ],
      // Do not minify instrumenter output.
      instrumenterOptions: {
        istanbul: { noCompact : true }
      }
    },
    junitReporter : {
      outputDir : 'reports',
      useBrowserName: false,
      outputFile: 'test-results.xml'
    },
    webpack: require('./webpack.config'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
