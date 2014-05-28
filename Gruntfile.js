
module.exports = function (grunt) {

    var root = 'public/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            css: {
                src: [root + 'less/style.less'],
                dest: root + 'css/all.css'
            }
        }
//        concat: {
//            options: {
//                stripBanners: {
//                    block: true,
//                    line: true
//                }
//            },
//            dist: {
//                //excludes all files from 3rdparty and tests
//                src: ['public/js/**/*.js', '!public/js/3rdparty/**', '!public/js/tests/**', '!public/js/**/_*.js'],
//                dest: 'public/js/<%= pkg.name %>-<%= pkg.version %>.js'
//            }
//        }
//        uglify: {
//            options: {
//                mangle: false
//            },
//            my_target: {
//                files: {
//                    'public/output.min.js': [root + 'js/app.js', root + 'js/routes.js']
//                }
//            }
//        }
//        cssmin: {
//            css: {
//                src: '',
//                dest: BUILD_CSS + 'css/all-min.css'
//            }
//        }

    });


    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task.
//    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.registerTask('default', ['concat', 'less']);
    grunt.registerTask('default', ['less']);

};
