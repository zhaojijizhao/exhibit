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
					'click #sign':'sign'
				},
				render:function(){
				},
				sign:function(e){
					e.preventDefault();
					var data ={
						user:{
							name:this.$el.find("#name").val(),
							psw:this.$el.find("#psw").val(),
							cell:this.$el.find("#cell").val(),
						}
					} 
					$.ajax({
						url: "/api/"+$("#type").val()+"user",
						type: "post",
						data: data,
						dataType:'json',
						success:function(data){
							alert("注册成功");
							location.href = "/normal/login"
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

