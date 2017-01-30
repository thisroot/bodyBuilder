module.exports = function(grunt) {
  grunt.initConfig({
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            target: {
                files: {
                    "public/css/app.css": "public/css/index/app.less",
                    "public/css/index_main.less.css": "public/css/index/index_main.less",
                }
            }
        },
        watch: {
            styles: {
               options: {
                    spawn: false,
                    event: ["added", "deleted", "changed"]
                },
                files: [ "public/css/*.css", "public/css/index/*.less"],
                tasks: [ "less:target" ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", ["watch"]);
};

