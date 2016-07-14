/*
 * https://github.com/phollome/grunt-list-files
 *
 * Copyright (c) 2016 Peter Holló
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function deepClean(src) {
  Object.keys(src).forEach(function(key) {
    if ((Array.isArray(src[key]) && !src[key].length)) {
      delete src[key];
    } else if (typeof src[key] === 'object') {
      if(!Object.keys(src[key]).length) {
        delete src[key];
      } else {
        deepClean(src[key]);
      }
    }
    if(typeof src[key] === 'object' && !Object.keys(src[key]).length) {
      delete src[key];
    }
  });
};
