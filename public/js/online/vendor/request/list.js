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
					if(this.user.type!="vendor"){
						alert('请先登录供应商账号');
						location.href = "/online/login";
					}
					_.bind(Helper.initHead, this)(Helper);
				},
				el:$("#main"),
				events:{
					'click #search': 'search'
				},
				render:function(){
					var selfthis = this;
					var page = $("#page").val()||1;
					var data = {
						cityid: $('#city').val(),
						word: $("#word").val()
					};
					$.ajax({
						url:'/api/exhibit/list/'+page,
						type:'get',
						data: data,
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data);
						},
						error:function(){
							alert("加载数据失败");
						}
					});
				},
				search: function(){
					var selfthis = this;
					var page = $("#page").val()||1;
					var cityid = $('#city').val();
					var word = $("#word").val();
					var data = {
						cityid: cityid,
						word: word
					};
					$.ajax({
						url:'/api/exhibit/list/'+page,
						type:'get',
						data: data,
						dataType:'json',
						success:function(data){
							_.bind(selfthis.renderList,selfthis)(data,cityid,word);
						},
						error:function(){
							alert("加载数据失败");
						}
					});
				},
				renderList:function(data,cityid,word){
					var selfthis = this;
					var self = this.$el;
					var temp = _.template(Helper.template.onlinerequestVendorListTemplate);
					var pageTemp = _.template(Helper.template.pagecontent);
					self.find("#list").html(temp({list:data.content}));
					self.find("#page").html(pageTemp({
						count:parseInt(data.count),
						limit:parseInt(data.limit),
						page:parseInt($("#page").val()),
						baseurl:'/online/vendor/request/',
						apdurl: (cityid > 0 || word) ? '/'+(cityid>0?cityid:0)+'/'+(word||'') :''
					}));
				}
			});
			var page = new view();
			page.render();
	});
});

