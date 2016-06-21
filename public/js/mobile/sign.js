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
							psw:this.$el.find("#clientPsw").val()							
						}
					};
					$.ajax({
						url: "/api/clientuser",
						type: "post",
						data: data,
						dataType:'json',
						success:function(data){
							alert("注册成功");
							location.href = "/mobile/login"
						},
						error:function(){
							alert("注册失败");
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
							location.href = "/mobile/login"
						},
						error:function(){
							alert("注册失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});