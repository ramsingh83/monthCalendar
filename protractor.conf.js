let chromeDriverPath = process.platform === 'win32' ? 'node_modules/chromedriver/lib/chromedriver/chromedriver.exe' : 'node_modules/chromedriver/bin/chromedriver';

exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:3000/',
  chromeDriver: chromeDriverPath,
  specs: [
    'src/**/*.e2e.js'
  ],
  capabilities: {
    browserName: 'chrome',
    platform: 'ANY',
    chromeOptions: {
      args: ['--test-type']
    }
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: false,
    includeStackTrace: true
  }
};
