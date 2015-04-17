module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        jshint:{
            files:['src/*.js','test/core/*.js']
        },
        uglify:{
            build:{
            src:['src/*.js'],
            dest:'build/jonah.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['jshint','uglify']);   
};
