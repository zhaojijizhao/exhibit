require(['../../../../js/public/base.js'],function(Base){
	Base.setRequirejs(1);
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
						location.href = "../../../mobile/login.html";
					}
					this.user = Helper.getlogin();
					if(this.user.type!="vendor"){
						alert('请先登录供应商账号');
						location.href = "../../../mobile/login.html";
					}
					var temp = _.template(Helper.template.mobileLoginTemplate);
					$(".nav .client").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="../../../mobile/index.html";
					});
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var detail= {};
					$.ajax({
						url: Helper.requestUrl + "exhibit/" + Helper.searchParam().id,
						type: "get",
						dataType:"json",
						success:function(data){
							detail = data;
							$("#main").html(_.template($("#maintpl").html())({detail:data}));
							$("#city,.city").html(_.template($('#citytpl').html())({city:Helper.city,detail:detail}));
						},
						error:function(){
							alert("获取详情失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

