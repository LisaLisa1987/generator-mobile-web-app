/**
 * Created by Lisa on 19.03.14.
 */

'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
// load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        files: [
          'index.html',
          'app/css/base.css'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/css/base.css': 'app/css/base.scss',
          'libs/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap.css': 'libs/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap.scss'
        }
      }
    }
  });

  grunt.registerTask('server', ['sass', 'connect:livereload', 'open', 'watch']);
};

