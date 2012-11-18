requirejs.config({
	baseUrl : '../../js/',
	paths : {
		'zepto' : 'https://cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min',
		'lodash' : 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.9.1/lodash.min',
		'backbone' : 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
		'backbone-helper' : 'lib/backbone-helper',
		'jsrender' : 'lib/jsrender',
		'underscore.deferred' : 'lib/underscore.deferred',
		'jasmine' : 'lib/jasmine-1.2.0/jasmine',
		'jasmine-html' : 'lib/jasmine-1.2.0/jasmine-html',
		'sinon' : 'lib/sinon-1.5.0',
		'jasmine-sinon' : 'lib/jasmine-sinon',
		'jasmine-jquery' : 'lib/jasmine-jquery'
	},
	shim : {
		'zepto' : {
			exports : '$'
		},
		'lodash' : {
			exports : '_'
		},
		'backbone' : {
			deps : ['lodash', 'zepto'],
			exports : 'Backbone'
		},
		'backbone-helper' : {
			deps : ['lodash', 'backbone'],
			exports : 'Backbone'
		},
		'jsrender' : {
			deps : ['zepto'],
			exports : '$'
		},
		'underscore.deferred' : {
			deps : ['lodash'],
			exports : '_'
		},
		'jasmine' : {
			exports: 'jasmine'
		},
		'jasmine-html' : {
			deps: ['jasmine'],
			exports: 'jasmine'
		},
		'sinon' : {
			exports: 'sinon'
		},
		'jasmine-sinon' : {
			deps: ['jasmine', 'sinon']
		},
		'jasmine-jquery' : {
			deps: ['jasmine']
		}
	}
});

require([
	'zepto',
	'lodash',
	'backbone',
	'jasmine-html',
	'sinon',
	'backbone-helper',
	'jasmine-sinon',
	'jasmine-jquery',
	'jsrender',
	'underscore.deferred'
], function(
	$,
	_,
	Backbone,
	jasmine,
	sinon
){
	// init jasmine
	var jasmineEnv = jasmine.getEnv();
	(function() {
		jasmineEnv.updateInterval = 1000;
		var htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);
		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};
	})();
	
	require([
		'spec/backbonejs.spec'
	], function(
		BackbonejsSpec
	){
		describe('Backbone.js', function(){
			BackbonejsSpec();
		});
		// run spec
		jasmine.getEnv().execute();
	});
	
});






