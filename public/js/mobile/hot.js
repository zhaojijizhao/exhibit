require(['../../js/public/base.js'],function(Base){
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
					if(Helper.islogin()){
						this.user = Helper.getlogin();
						var temp = _.template(Helper.template.mobileLoginTemplate);
						$(".toplink").html(temp(this.user));
						$("#exit").on("click",function(e){
							e.preventDefault();
							Helper.deletelogin();
							location.href="../mobile/index.html";
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
					'click #search':'search'
				},
				render:function(){
					var selfthis = this;
					var self = this.$el;
					var page = Helper.searchParam().page || 1;
					if(self.find("#search-clientname").val()||self.find("#search-projectname").val()){
						page += '/'+ (self.find("#search-clientname").val()||'nil') + '/' + 
								(self.find("#search-projectname").val()||'nil');
					}
					$.ajax({
						url:Helper.requestUrl + 'offerhot/'+page,
						type:'get',
						dataType:'json',
						success:function(data){
							var temp = _.template(Helper.template.hotListTemplate);
							var pageTemp = _.template(Helper.template.pagecontent);
							self.find("#list").html(temp({list:data.content}));
							self.find("#page").html(pageTemp({
								count:parseInt(data.count),
								limit:parseInt(data.limit),
								page:Helper.searchParam().page || 1,
								baseurl:'../mobile/hot.html'
							}));
						},
						error:function(){
							alert("加载数据失败");
							location.href = "../mobile/index.html";
						}
					});
				},
				search:function(){
					var selfthis = this;
					var self = this.$el;
					var page = Helper.searchParam().page || 1;
					if(self.find("#search-clientname").val()||self.find("#search-projectname").val()){
						page += '/'+ (self.find("#search-clientname").val()||'nil') + '/' + 
								(self.find("#search-projectname").val()||'nil');
					}
					$.ajax({
						url:Helper.requestUrl + 'offerhot/'+page,
						type:'get',
						dataType:'json',
						success:function(data){
							var temp = _.template(Helper.template.hotListTemplate);
							var pageTemp = _.template(Helper.template.pagecontent);
							self.find("#list").html(temp({list:data.content}));
							self.find("#page").html(pageTemp({
								count:parseInt(data.count),
								limit:parseInt(data.limit),
								page:Helper.searchParam().page || 1,
								baseurl:'../mobile/hot.html'
							}));
						},
						error:function(){
							alert("加载数据失败");
							location.href = "../mobile/index.html";
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});