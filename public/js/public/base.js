define([],function(){
	function setRequirejs(type){
		var config = {
			baseUrl:"../../",
			paths:{
				jquery:"lib/jquery/dist/jquery.min",
				underscore:"lib/underscore/underscore-min",
				backbone:"lib/backbone/backbone-min",
				text:"lib/text/text",
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
