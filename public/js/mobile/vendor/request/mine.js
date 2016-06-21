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
					if(this.user.type!="vendor"){
						alert('请先登录供应商账号');
						location.href = "/mobile/login";
					}
					var temp = _.template(Helper.template.mobileLoginTemplate);
					$(".nav .client").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="/mobile/index";
					});
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var selfthis = this;
					$.ajax({
						url:'/api/exhibit/byvendorid/'+ this.user._id,
						type:'get',
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data);
						},
						error:function(){
							alert("加载数据失败");
							location.href = "/mobile/index";
						}
					});
				},
				renderList:function(data){
					var selfthis = this;
					var self = this.$el;
					var temp = _.template(Helper.template.mobilerequestVendorListTemplate);
					self.html(temp({list:data}));
				}
			});
			var page = new view();
			page.render();
	});
});

