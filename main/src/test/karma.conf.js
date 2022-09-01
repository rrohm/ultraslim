/* 
 * The MIT License
 *
 * Copyright 2022 Robert Rohm r.rohm@aeonium-systems.de.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Configuration for the karma test runner. 
 * 
 * @param {object} config
 * @returns {undefined}
 */
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    files: [
//      'src/src/*.js',
      '*test.js'
    ],
    basePath: '.',
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-chrome-launcher'
    ],
    frameworks: ['jasmine'],
    preprocessors: ['coverage'],
    reporters: ['progress', 'coverage'],
    captureTimeout: 5000,
    singleRun: true,
//    customLaunchers: {
//      ChromeHeadless: {
//        base: 'Chrome',
//        flags: [
//          '--headless',
//          '--disable-gpu',
//          '--no-sandbox',
//          '--remote-debugging-port=9222',
//        ]
//      }
//    },
//    browsers: ['ChromeHeadless'],
    browsers: ['Firefox'],
    restartOnFileChange: true
  });
};