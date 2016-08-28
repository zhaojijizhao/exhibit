require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					if(!Helper.islogin()){
						alert('请先登录');
						location.href = "/online/login";
					}
					this.user = Helper.getlogin();
					if(this.user.type!="vendor"){
						alert('请先登录供应商账号');
						location.href = "/online/login";
					}
					_.bind(Helper.initHead, this)(Helper);
				},
				el:$("#main"),
				events:{
				},
				render:function(){
				}
			});
			var page = new view();
			page.render();
	});
});

