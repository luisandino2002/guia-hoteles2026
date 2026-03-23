const { option } = require("grunt");
const { watch, options } = require("less");

module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt,{
        useminPrepare:''
    });
    grunt.initConfig({
        sass: {
            dist:{
                files:{
                    'css/main.css': 'sass/main.scss'
                }
            }
        },

        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev:{
                bsfiles: {
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                }
            },
            option: {
                watchTask: true,
                server: {
                    baseDir: './'
                }
            }
        },

        imagemin:{
            dynamic:{
                files: [{
                    expand: true,
                    cwd: '/',
                    src: 'imges/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            html:{
                files: [{
                    expand: true,
                    dot: true,
                    cws: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts:{
                files: [{
                    expand:true,
                    dot:true,
                    cwd:'node_modules/open_iconic/font',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean:{
            build:{
                src:['dist/']
            }
        },

        cssmin:{
            dist:{}
        },

        uglify:{
            dist:{}
        },

        filerev: {
            options:{
                encoding: 'utf8',
                algorithm: 'md5',
                length:20
            },
            release:{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        concat:{
            option:{
                separator:';'
            },
            dist:{}
        },

        userminPrepare:{
            foo:{
                dest: 'dist',
                src: 'index.html, about.html, precios.html, contacto.html'
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name: 'cssmin',
                            createConfig: function(context,block){
                                var generated = context.options.generated;
                                generated.options={
                                    keepSpecialComments:0,
                                    rebase:false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html','dist/about.html','dist/precios.html','dist/contacto.html'],
            options:{
                assetsDir: ['dist','dist/css','dist/js']
            }
        }


    });

        grunt.registerTask('css',['sass']);
        grunt.registerTask('default',['browserSync','Watch']);
        grunt.registerTask('img:compress',['imagemin']);
        grunt.registerTask('build',[
            'clean',
            'copy',
            'imagemin',
            'useminPrepare',
            'concat',
            'cssmin',
            'uglify',
            'filerev',
            'usemin'
        ])
};