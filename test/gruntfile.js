
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
            }
        },
        nodemon:{
            dev:{
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
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    });
    // 加载包含下列任务的插件。
    grunt.loadNpmTasks('grunt-contrib-watch');          //有文件改动就重新执行在里面注册好的任务
    grunt.loadNpmTasks('grunt-nodemon');          //实时监听app.js，重启
    grunt.loadNpmTasks('grunt-concurrent');          //针对慢任务例如SASS和LESS的编译

    grunt.option('force',true);
    // 默认被执行的任务列表。
    grunt.registerTask('default',['concurrent']);
};