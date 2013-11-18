module.exports = function (grunt) {
    'use strict';

    // Project configuration
    grunt.initConfig({

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!' + '\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>' + '\n' +
            ' * <%= pkg.repository.url %>' + '\n' +
            ' *' + '\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> ' + '\n' +
            ' * Licensed <%= pkg.license %>' + '\n' +
            ' *' + '\n' +
            ' * Date: <%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
            ' */' + '\n\n\n',

        // Task configuration
        clean: {
            files: ['dist'],
            dist : ['dist/movie-draft.js']
        },

        concat: {
            options: {
                banner      : '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src : ['src/main.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src : '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        // qunit: {
        //     files: ['test/**/*.html']
        // },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src    : 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src    : ['src/**/*.js']
            },
            // test: {
            //     options: {
            //         jshintrc: '.jshintrc'
            //     },
            //     src: ['test/**/*.js']
            // }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
                // tasks: ['jshint:src', 'qunit']
            },
            // test: {
            //     files: '<%= jshint.test.src %>',
            //     tasks: ['jshint:test', 'qunit']
            // },
        },
    });

    // Load Grunt plugins
    require('load-grunt-tasks')(grunt);

    // Default task
    grunt.registerTask('default', [
        'jshint',
        // 'qunit',
        'clean:files',
        'concat',
        'uglify'
    ]);

    // Build task
    grunt.registerTask('build', [
        'clean:files',
        'concat',
        'uglify',
        'clean:dist'
    ]);

    // Travis CI task
    // grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('test', ['jshint']);
};
