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
					'click #signClient':'signClient',
					'click #signVendor':'signVendor'
				},
				render:function(){
				},
				signClient:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#clientName").val(),
							cell:this.$el.find("#clientCell").val(),
							psw:this.$el.find("#clientPsw").val(),
							type:'personal'
						}
					};
					$.ajax({
						url: "/api/clientuser",
						type: "post",
						data: data,
						dataType:'json',
						success:function(data){
							alert("注册成功");
							location.href = "/online/login"
						},
						error:function(e){
							alert(e.responseJSON.msg ? e.responseJSON.msg : "注册失败");
						}
					});
				},
				signVendor:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#vendorName").val(),
							cell:this.$el.find("#vendorCell").val(),
							psw:this.$el.find("#vendorPsw").val()
						}
					};
					$.ajax({
						url: "/api/vendoruser",
						type: "post",
						data: data,
						dataType:'json',
						success:function(data){
							alert("注册成功");
							location.href = "/online/login"
						},
						error:function(){
							alert(e.responseJSON.msg ? e.responseJSON.msg : "注册失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});