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
					Helper.deletelogin();
					$(".nav .client,.nav .vendor").remove();
					$('.toptab li').bind("click",function(){
						var i = $(this).index();
						$('.toptab li').removeClass('on');
						$(this).addClass('on');
						$('.all-form .form').addClass('hide');
						$($('.all-form .form')[i]).removeClass('hide');
					});
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
							location.href = "/mobile/index";
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
							location.href = "/mobile/index";
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