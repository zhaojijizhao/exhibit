require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					if(!Helper.islogin()){
						location.href = "/normal/login"
					}
					this.user = Helper.getlogin();
					Helper.setrefer("/vendor/index");
				},
				el:$("#main"),
				events:{
					'click #confirm':'save'
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					// $.ajax({
					// 	url: "/api/offer",
					// 	type: "post",
					// 	data: data,
					// 	dataType:"json",
					// 	success:function(data){
					// 		selfthis.data = data;
					// 		alert("发送报价成功");
					// 		location.href = "/vendor/index";
					// 	},
					// 	error:function(){
					// 		alert("发送报价失败");
					// 	}
					// });
				}
			});
			var page = new view();
			page.render();
	});
});

