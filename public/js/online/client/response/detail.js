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
					if(this.user.type!="client"){
						alert('请先登录客户账号');
						location.href = "/online/login";
					}
					var temp = _.template(Helper.template.onlineLoginTemplate);
					$(".nav .vendor").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="/online/index";
					});
				},
				el:$("#main"),
				events:{
					'click #confirm':'save'
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					$.ajax({
						url: "/api/offer/confirm/"+$(e.target).attr('oid'),
						type: "post",
						data: {},
						dataType:"json",
						success:function(data){
							selfthis.data = data;
							alert("确认报价成功");
							location.href = "/online/index";
						},
						error:function(){
							alert("确认报价失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

