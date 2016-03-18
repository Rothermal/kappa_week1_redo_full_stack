module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: 'client/client.js'
        },
        watch: {
            scripts: {
                files: 'client/client.js',
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            build: {
                src: 'client/client.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "angular-route/angular-route.min.js"
                    //"checklist-model/checklist-model.js"
                ],
                "dest": "server/public/vendor/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules/bootstrap/dist/",
                src: [
                    "css/bootstrap.min.css",
                    "css/bootstrap.min.css.map",
                    "css/bootstrap.",
                    "js/bootstrap.min.js"
                ],
                "dest": "server/public/vendor/bootstrap/"
            },
            jQuery:{
                expand : true,
                cwd:"node_modules/jquery/dist/",
                src:"jquery.min.js",
                "dest":"server/public/vendor/jquery/"

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
