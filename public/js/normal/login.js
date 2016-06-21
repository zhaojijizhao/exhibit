require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					Helper.deletelogin();
					$('.toptab li').bind("click",function(){
						var i = $(this).index();
						$('.toptab li').removeClass('on');
						$(this).addClass('on');
						$("#type").val($('.toptab li.on').index()==1?"client":"vendor");
					});
				},
				el:$("#main"),
				events:{
					'click #login':'login'
				},
				render:function(){
				},
				login:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#name").val(),
							psw:this.$el.find("#psw").val()
						}
					};
					$.ajax({
						url: "/api/"+$("#type").val()+"login",
						type: "post",
						data: data,
						dataType:"json",
						success:function(data){
							alert("登录成功");
							Helper.setlogin(data[0]);
							location.href = Helper.getrefer() || "/client/index"
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

