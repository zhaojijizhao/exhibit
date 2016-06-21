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
				},
				render:function(){
					var selfthis = this;
					$.ajax({
						url:'/api/exhibit/list',
						type:'get',
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data);
						},
						error:function(){
							alert("加载数据失败");
							location.href = "/vendor/index";
						}
					});
				},
				renderList:function(data){
					var selfthis = this;
					var self = this.$el;
					var temp = _.template(Helper.template.requestVendorListTemplate);
					self.html(temp({list:data}));
				}
			});
			var page = new view();
			page.render();
	});
});

