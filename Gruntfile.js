module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        browser: true,
        undef: true,
        globals: {
          g: true,
          EventEmitter: false,
          FPSMeter: false,
          log: false,
          PIXI: false
        }
      },
      all: ['component/**/*.js', 'core/**/*.js', 'input/**/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
};
