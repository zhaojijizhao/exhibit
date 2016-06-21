require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					if(Helper.islogin()){
						this.user = Helper.getlogin();
						var temp = _.template(Helper.template.onlineLoginTemplate);
						$(".toplink").html(temp(this.user));
						$("#exit").bind("click",function(e){
							e.preventDefault();
							Helper.deletelogin();
							location.href="/online/index";
						});
						if(this.user.type=="client"){
							$(".nav .vendor").remove();
						}else if(this.user.type=="vendor"){
							$(".nav .client").remove();
						}
					}else{
						$(".nav .client,.nav .vendor").remove();
					}
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