require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					_.bind(Helper.initUnloginHead, this)(Helper);
				},
				el:$("#main"),
				events:{
					'click #loginClient':'loginClient',
					'click #loginVendor':'loginVendor'
				},
				render:function(){
				},
				loginClient:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#clientName").val(),
							cell:this.$el.find("#clientCell").val(),
							psw:this.$el.find("#clientPsw").val()
						}
					};
					$.ajax({
						url: "/api/clientlogin",
						type: "post",
						data: data,
						dataType:"json",
						success:function(data){
							alert("登录成功");
							Helper.setlogin(data[0]);
							location.href = "/online/index";
						},
						error:function(){
							alert("登录失败");
						}
					});
				},
				loginVendor:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#vendorName").val(),
							cell:this.$el.find("#vendorCell").val(),
							psw:this.$el.find("#vendorPsw").val()
						}
					};
					$.ajax({
						url: "/api/vendorlogin",
						type: "post",
						data: data,
						dataType:"json",
						success:function(data){
							alert("登录成功");
							Helper.setlogin(data[0]);
							location.href = "/online/index";
						},
						error:function(){
							alert("登录失败");
						}
					});
				}
				
			});
			var page = new view();
			page.render();
	});
});