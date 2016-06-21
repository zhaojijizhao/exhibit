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
					Helper.setrefer("/client/index");
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var selfthis = this;
					$.ajax({
						url:'/api/exhibit/byuid/'+this.user._id,
						type:'get',
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data);
						},
						error:function(){
							alert("加载数据失败");
							location.href = "/client/index";
						}
					});
				},
				renderList:function(data){
					var selfthis = this;
					var self = this.$el;
					var temp = _.template(Helper.template.responseRequestListTemplate);
					self.html(temp({list:data}));
					this.$el.find(".detail").on("click",_.bind(selfthis.showResponse,selfthis));
				},
				showResponse:function(e){
					e.preventDefault();
					var selfthis = this;
					var eid = $(e.currentTarget).attr("eid");
					$.ajax({
						url:'/api/offer/byexhibit/'+eid,
						type:'get',
						dataType:'json',
						success:function(data){
							var temp = _.template(Helper.template.responseListTemplate);
							if($(e.currentTarget).closest('li').next().hasClass('trend')){
								$(e.currentTarget).closest('li').next().html(temp({list:data}));
							}else{
								$(e.currentTarget).closest('li').after(temp({list:data}));
							}
						},
						error:function(){
							alert("加载数据失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

