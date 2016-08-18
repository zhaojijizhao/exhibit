require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){

			var temp = '<ul>\
						<% if(list.length>0){\
							_.each(list,function(v,k){%>\
							<li>\
								<span class="roll-cname"><%=v.info.cname%></span>\
								<span class="roll-name"><%=v.info.name%></span>\
								<span class="roll-detail"><a class="detail" href="/online/vendor/request/detail/<%=v._id%>">查看详情</a></span>\
							</li>\
						<%});\
					}%>\
				</ul>';
			var view = Backbone.View.extend({
				initialize:function(){
					if(Helper.islogin()){
						this.user = Helper.getlogin();
						var temp = _.template(Helper.template.onlineLoginTemplate);
						$(".toplink").html(temp(this.user));
						$("#exit").bind("click",function(e){
							e.preventDefault();
							Helper.deletelogin();
							location.href="/online/index";
						});
						if(this.user.type=="client"){
							$(".nav .vendor").remove();
						}else if(this.user.type=="vendor"){
							$(".nav .client").remove();
						}
					}else{
						$(".nav .client,.nav .vendor").remove();
					}
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var _this = this;
					$.ajax({
						url: '/api/exhibit/list/1',
						type: 'get',
						dataType: 'json',
						success:function(data){
							if(data.content){
								if(data.content.length < 14 && data.content.length > 0){
									var len =  data.content.length;
									for(var i = 0 ; i < 14 - len ; i++){
										data.content.push(data.content[i]);
									}
								}
								if(data.content.length >= 14){
									data.content.splice(13,data.content.length-14);
								}
								data.content = data.content.concat(data.content.slice(0,6));
							}
							_this.$el.find("#r1").html(_.template(temp)({list:data.content}));
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});