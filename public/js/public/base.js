define([],function(){
	function setRequirejs(type){
		var config = {
			baseUrl:"/",
			paths:{
				jquery:"lib/jquery/dist/jquery.min",
				underscore:"lib/underscore/underscore-min",
				backbone:"lib/backbone/backbone-min",
				angular:"lib/angular/angular.min",
				bootstrap:"lib/bootstrap/dist/js/bootstrap.min",
				vue:"lib/vue/dist/vue.min",
				vuerouter:"lib/vue-router/dist/vue-router.min",
				text:"lib/text/text",
				push:'js/online/push',
				public:'js/public',
				client:'js/client',
				vendor:'js/vendor',
				helper:'js/public/helper'
			},
			shim:{
				'jquery':{
					exports:'$'
				},
				'bootstrap':{
					deps: ['jquery'],
					exports: 'bs'
				}
			}
		};
		
		if(type == 1){
			config.baseUrl = "/";
		}

		requirejs.config(config);
	}
	var base = {
		setRequirejs:setRequirejs
	}
	return base;
});
