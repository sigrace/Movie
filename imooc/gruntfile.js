
module.exports = function(grunt){
    //project config
    grunt.initConfig({
        watch:{                                //watch任务配置信息
            jade:{                             //任务目标
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                //tasks:['jshint'],
                options:{
                    livereload:true
                }
            },
            uglify: {
                files: ['public/**/*.js'],
                tasks: ['jshint'],
                options:{
                    livereload: true
                }
            },
            styles: {
                files: ['public/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        jshint :{
            options:{
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },
        less:{
            development: {
                options: {
                    compress:true,
                    yuicompress: true,
                    optimization:2
                },
                files: {
                    'public/bulid/index.css' : 'public/less/index.less'
                }
            }
        },
        uglify: {
            development: {
                files: {
                    'public/bulid/admin.min.js' : 'public/js/admin.js',
                    'public/bulid/detail.min.js' : [
                        'public/js/detail.js'
                    ]
                }
            }
        },
        nodemon:{
            dev:{
                // script: 'app.js',
                options:{
                    file:'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_modules/**','.DS_Store'],
                    watchedExtensions:['js'],
                    watchedFolders:['./'],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        mochaTest:{
            options:{
                reporter: 'spec'
            },
            src:['test/**/*.js']
        },
        concurrent:{
            tasks:['nodemon','watch','less','uglify','jshint'],
            options:{
                logConcurrentOutput:true
            }
        }
    });
    // 加载包含下列任务的插件。
    grunt.loadNpmTasks('grunt-contrib-watch');          //有文件改动就重新执行在里面注册好的任务
    grunt.loadNpmTasks('grunt-nodemon');          //实时监听app.js，重启
    grunt.loadNpmTasks('grunt-concurrent');          //针对慢任务例如SASS和LESS的编译
    grunt.loadNpmTasks('grunt-mocha-test');          
    grunt.loadNpmTasks('grunt-contrib-less');          
    grunt.loadNpmTasks('grunt-contrib-uglify');          
    grunt.loadNpmTasks('grunt-contrib-jshint');          

    grunt.option('force',true);
    // 默认被执行的任务列表。
    grunt.registerTask('default',['concurrent']);
    grunt.registerTask('test',['mochaTest']);
};