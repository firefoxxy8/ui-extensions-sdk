const assert = require('assert')

const webpackConfig = require('./webpack.config.js')
const webpackBabelLoaderConfig = webpackConfig.module.loaders[0]
assert.equal(webpackBabelLoaderConfig.loader, 'babel-loader')

webpackConfig.devtool = 'inline-source-map' // Gives us correct stack traces.
webpackBabelLoaderConfig.query.plugins.push('babel-plugin-rewire')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'chai', 'chai-as-promised'],
    files: [
      './test/unit/**/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './lib/api/index.js': ['webpack', 'sourcemap'],
      './test/unit/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
