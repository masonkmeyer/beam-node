module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['mochaTest', 'jshint'],
        options: {
          debounceDelay: 250,
        },
      },
    }
  });

  grunt.registerTask('default', ['mochaTest', 'jshint']);
};
