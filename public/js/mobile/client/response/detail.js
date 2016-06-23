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
					if(this.user.type!="client"){
						alert('请先登录客户账号');
						location.href = "../../../mobile/login.html";
					}
					var temp = _.template(Helper.template.mobileLoginTemplate);
					$(".nav .vendor").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="../../../mobile/index.html";
					});
				},
				el:$("#main"),
				events:{
					'click #confirm':'save'
				},
				render:function(){
					var detail= {};
					$.ajax({
						url: Helper.requestUrl + "offer/" + Helper.searchParam().id,
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
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					$.ajax({
						url: Helper.requestUrl + "offer/confirm/"+$(e.target).attr('oid'),
						type: "post",
						data: {},
						dataType:"json",
						success:function(data){
							selfthis.data = data;
							alert("确认报价成功");
							location.href = "../../../mobile/index.html";
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

