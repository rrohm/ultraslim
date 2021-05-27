/* 
 * The MIT License
 *
 * Copyright 2017 Robert Rohm r.rohm@aeonium-systems.de.
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
 * ae-ultraslim grunt configuration.
 * 
 * @param {type} grunt
 * @returns {undefined}
 */
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    clean: {
      dist: ['src/dist/**']
    },
    jshint: {
      all: ['Gruntfile.js', 'src/src/**/*.js', 'src/test/**/*.js'],
      options: {
        jshintrc: true
      }
//      ,
//      beforeconcat: [],
//      afterconcat: []
    },
    uglify: {
      options: {
        compress: {
          collapse_vars: true,
          conditionals: true,
          dead_code: true,
          join_vars: true,
          loops: true,
          warnings: true,
          passes: 10,
          pure_funcs: ['console.log'],
          unused: true
        },
        sourceMap: true,
        sourceMapName: 'src/dist/ae-ultraslim.map'
      },
      all: {
        files: {
          'src/dist/ae-ultraslim.min.js': ["src/src/**/*.js"]
        }
      }
    },
    // Client Testing: 
    jasmine: {
      src: "src/src/**/*.js",
      options: {
        keepRunner: true, // keep Test-Runner, e.g. for manual testing
        specs: 'src/test/**/*test.js',
        vendor: 'node_modules/sinon/pkg/sinon-1.17.3.js',
        helpers: [
          'node_modules/jasmine-ajax/lib/mock-ajax.js'
        ],
        display: 'full',
        showLog: false,
        showLogging: false
      }
    },
    // Watch project files for changes:  
    watch: {
      all: {
        files: ['src/test/**/*.js', 'src/src/**/*.js', 'Gruntfile.js'],
        tasks: ['jshint', 'jasmine']
      }
    }
  });
  grunt.registerTask('default', ['jshint', 'jasmine', 'clean', 'uglify']);
  grunt.registerTask('test', ['jasmine']);
};
