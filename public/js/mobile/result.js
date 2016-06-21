require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					$("#slideout").on('click',function(){
						$(".rbnav").addClass("on");
					});
					$("#slidein").on('click',function(){
						$(".rbnav").removeClass("on");
					})
					if(!Helper.islogin()){
						alert('请先登录');
						location.href = "/mobile/login";
					}
					this.user = Helper.getlogin();
					var temp = _.template(Helper.template.mobileLoginTemplate);
					$(".nav .vendor").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="/mobile/index";
					});
				},
				el:$("#main"),
				events:{
				}
			});
			var page = new view();
			page.render();
	});
});