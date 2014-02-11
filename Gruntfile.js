module.exports = function(grunt){
    grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
	jshint:{
	    files:['src/*.js','test/core/*.js']
	},
	uglify:{
	    build:{
	    src:'src/*.js',
	    dest:'build/jonah.min.js'
	    }
	},
	qunit:{
	    files: ["test/*.html"]
	}
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.registerTask('default',['jshint','qunit','uglify']);   
};
