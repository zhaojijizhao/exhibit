define([],function(){
	function setRequirejs(type){
		var config = {
			baseUrl:"../../",
			paths:{
				jquery:"lib/jquery",
				underscore:"lib/underscore",
				backbone:"lib/backbone",
				text:"lib/text",
				public:'js/public',
				client:'js/client',
				vendor:'js/vendor',
				helper:'js/public/helper'
			},
			shim:{
				'jquery':{
					exports:'$'
				}
			}
		};
		
		if(type == 1){
			config.baseUrl = "../../../../";
		}

		requirejs.config(config);
	}
	var base = {
		setRequirejs:setRequirejs
	}
	return base;
});
