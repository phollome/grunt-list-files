/*
 * grunt-list-files
 * https://github.com/phollome/grunt-list-files
 *
 * Copyright (c) 2016 Peter Holló
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },
    listfiles: {
      default_options: {
        files: {
          'tmp/default_options': ['test/fixtures/**']
        }
      },
      custom_options: {
        options: {
          ignore: 'test/fixtures/',
          route: 'fixtures',
          clean: false

        },
        files: {
          'tmp/custom_options': ['test/fixtures/**']
        }
      },
      custom_options_unstructured: {
        options: {
          ignore: 'test/fixtures/',
          structured: false
        },
        files: {
          'tmp/custom_options_unstructured': ['test/fixtures/**']
        }
      },
      custom_options_combine: {
        options: {
          ignore: 'test/fixtures/',
          combine: true
        },
        files: {
          'tmp/custom_options_combine': ['test/fixtures/**']
        }
      }
    },
    nodeunit: {
      tests: ['test/*-test.js']
    }
  });
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean','listfiles', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
