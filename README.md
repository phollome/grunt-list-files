# grunt-list-files

> List recursivly all files of given folder.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-list-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-list-files');
```

## The "listfiles" task

### Overview
In your project's Gruntfile, add a section named `listfiles` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  listfiles: {
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.ignore
Type: `String`
Default value: `''`

A string value represents the path from the working direction which will be ignored.

#### options.clean
Type: `Boolean`
Default value: `true`

A boolean value that is used to decide if empty folders will be exclude from the output.

#### options.structured
Type: `Boolean`
Default value: `true`

A boolean value that is used to decide if output will be structured.

#### options.combine
Type: `Boolean`
Default value: `false`

A boolean value that is used to decide if output will be both structured and unstructured.

### Usage Examples

#### Default Options
In this example, the default options are used to analyse folder `src/testing` and store the result in `dest/default_options`. No folder will be ignored and empty folder will be excluded from output.

```js
grunt.initConfig({
 listfiles: {
    options: {},
    files: {
      'dest/default_options': ['src/testing/**'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to analyse folder `src/testing` and store the result in `dest/custom_options`. Folder `src/` will be ignored (the analysis starts at sub folders) and empty folders are not excluded.

```js
grunt.initConfig({
 listfiles: {
    options: {
      ignore: 'src/',
      clean: false,
    },
    files: {
      'dest/custom_options': ['src/testing/**'],
    },
  },
});
```

#### Structured Option
In this example, custom options are used to analyse folder `src/testing` and store only the list of files in `dest/custom_options_unstructured`. Folder `src/` and `clean` option will be ignored (the analysis starts at sub folders).  

```js
grunt.initConfig({
 listfiles: {
    options: {
      ignore: 'src/',
      structured: false,
    },
    files: {
      'dest/custom_options_unstructured': ['src/testing/**'],
    },
  },
});
```

#### Combine Option
In this example, custom options are used to analyse folder `src/testing` and store both the list of files and the structure in `dest/custom_options_combine`. Folder `src/` and `clean` option will be ignored (the analysis starts at sub folders).

```js
grunt.initConfig({
 listfiles: {
    options: {
      ignore: 'src/',
      combine: true,
    },
    files: {
      'dest/custom_options_combine': ['src/testing/**'],
    },
  },
});
```

## Upcoming
- export YAML support
- ignore files by set maximum size
- show more file and folder informations in output

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
