/*
 * grunt-list-files
 * https://github.com/phollome/grunt-list-files
 *
 * Copyright (c) 2016 Peter Holló
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('colors');
var fs = require('fs');

var deepMerge = require('./../lib/deep-merge');
var deepClean = require('./../lib/deep-clean');

module.exports = function(grunt) {

  grunt.registerMultiTask('listfiles', 'List recursively all files from given folder.', function() {

    var options = this.options({
      ignore: '',
      clean: true,
      structured: true,
      combine: false
    });

    if(options.combine && !options.structured) {
      options.structured = true;
    }

    this.files.forEach(function(file) {
      var struct = {};
      if(options.structured) {
        struct['structure'] = {};
      }
      if(options.combine || !options.structured) {
        struct['files'] = [];
      }

      var cwd = file.cwd || '';
      file.src.filter(function(path) {
        var realPath = cwd + path;
        if (!grunt.file.exists(realPath)) {
          grunt.log.warn('Source "' + realPath + '" not found.');
          return false;
        } else if (realPath.length < options.ignore.length) {
          grunt.log.writeln(colors.italic('Ignoring "' + realPath + '".'));
          return false;
        }
        return true;
      }).map(function(path) {
        if (!path) {
          return;
        }
        if (options.structured) {
          var pathArr = path.replace(options.ignore, '').split('/');
          if (grunt.file.isDir(cwd + path)) {
            var dest = struct.structure;
            for (var i = 0, len = pathArr.length; i < len; i++) {
              if (grunt.file.isDir(cwd + path) && !dest[pathArr[i]]) {
                dest[pathArr[i]] = {
                  files: []
                };
              }
              dest = dest[pathArr[i]];
            }
            struct.structure = deepMerge(struct.structure, dest);
          }
        }
        if (grunt.file.isFile(cwd + path)) {
          return path;
        }
      }).forEach(function(path) {
        if (!path) {
          return;
        }
        if (options.structured) {
          var pathArr = path.replace(options.ignore, '').split('/');
          pathArr.pop();
          var dest = struct.structure;
          for (var i = 0, len = pathArr.length; i < len; i++) {
            dest = dest[pathArr[i]];
          }
          if (dest.files) {
            dest.files.push(path.replace(options.ignore, ''));
          }
        }
        if (!options.structured || options.combine){
          struct.files.push(path.replace(options.ignore, ''));
        }
      });
      if (options.ignore !== '') {
        struct['ignored'] = options.ignore;
      }
      if (options.clean && options.structured) {
        grunt.log.writeln(colors.italic('Removing empty elements by default.'));
        deepClean(struct);
      }
      grunt.file.write(file.dest, JSON.stringify(struct));
      grunt.log.write('File structure saved to "' + file.dest + '"...');
      grunt.log.writeln(colors.green('OK'));
    });
  });
};
