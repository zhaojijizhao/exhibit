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
								<span class="roll-detail">\
									<!--<a class="detail" href="/online/vendor/request/detail/<%=v._id%>">查看详情</a>-->\
									<span><%=v.timeabout%>前发布</span>\
								</span>\
							</li>\
						<%});\
					}%>\
				</ul>';
			var view = Backbone.View.extend({
				initialize:function(){
					_.bind(Helper.initHead, this)(Helper);
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
							var now = Date.now(),time;
							if(data.content){
								for(var i = 0; i < data.content.length; i++){
									time = new Date(data.content[i].created_at).getTime();
									time = (now-time)/1000/60;
									if(time < 60){
										data.content[i].timeabout = parseInt(time) + "分钟";
									}else if(time/60 < 60){
										data.content[i].timeabout = parseInt(time/60) + "小时";
									}else{
										data.content[i].timeabout = parseInt(time/60/24) + "天";
									}
								}
							}
							_this.$el.find("#r1").html(_.template(temp)({list:data.content}));
						}
					});
					if(!Helper.islogin()){
						$("#main .in").addClass('three-part');
						$("#main .in").prepend('<div class="quicklink">\
							<a href="/online/quicksign">一键注册,</br>快速发布需求</a>\
							<a class="small" href="/online/login">个人用户入口</a>\
							<a class="small" href="/online/clientlogin">企业用户入口</a>\
							<a class="small" href="/online/vendorlogin">签约商入口</a>\
							<!--<a class="small" href="/online/sign">注册</a>-->\
							<!--<a class="small" href="/online/login">登录</a>-->\
						</div>');
					}
				}
			});
			var page = new view();
			page.render();
	});
});