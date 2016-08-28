require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					if(!Helper.islogin()){
						alert('请先登录');
						location.href = "/online/login";
					}
					this.user = Helper.getlogin();
					if(this.user.type!="client"){
						alert('请先登录客户账号');
						location.href = "/online/login";
					}
					_.bind(Helper.initHead, this)(Helper);
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var selfthis = this;
					var page = $("#page").val()||1;
					$.ajax({
						url:'/api/exhibit/byuid/'+this.user._id + "/" + page,
						type:'get',
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data);
						},
						error:function(){
							alert("加载数据失败");
							location.href = "/online/index";
						}
					});
				},
				renderList:function(data){
					var selfthis = this;
					var self = this.$el;
					var temp = _.template(Helper.template.onlinerequestListTemplate);
					var pageTemp = _.template(Helper.template.pagecontent);
					self.find("#list").html(temp({list:data.content}));
					self.find("#page").html(pageTemp({
						count:parseInt(data.count),
						limit:parseInt(data.limit),
						page:parseInt($("#page").val()),
						baseurl:'/online/client/request/'
					}));
				}
			});
			var page = new view();
			page.render();
	});
});

