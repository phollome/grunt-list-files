'use strict';

var grunt = require('grunt');

exports.list_files = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'Structures should be equal.');
    test.done();
  },
  custom_options: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'Structures should be equal (with ignored path).');
    test.done();
  },
  unstructured: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/custom_options_unstructured'));
    var expected = JSON.parse(grunt.file.read('test/expected/custom_options_unstructured'));

    actual.files.sort();
    expected.files.sort();

    test.equal(JSON.stringify(actual.files), JSON.stringify(expected.files), 'File paths should be equal (no structure).');
    test.done();
  },
  combine: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/custom_options_combine'));
    var expected = JSON.parse(grunt.file.read('test/expected/custom_options_combine'));

    actual.files.sort();
    expected.files.sort();

    test.equal(JSON.stringify(actual), JSON.stringify(expected), 'File lists and structures should be equal (with ignored path).');
    test.done();
  }
};
