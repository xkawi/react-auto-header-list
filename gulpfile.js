var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

/**
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 */
var taskConfig = {

	component: {
		name: 'ReactAutoHeaderList',
		dependencies: [
			'react',
			'react-dom'
		],
		lib: 'lib'
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'example.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
