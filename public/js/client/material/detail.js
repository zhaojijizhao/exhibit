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
					'click .addbtn':'addone',
					'click #save':'save'
				},
				render:function(){
				},
				addone:function(e){
					e.preventDefault();
					var item = $(e.currentTarget);
					item.before(item.prev().clone());
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					var data ={
						exhibit:{
							other:_.map(self.find("#other .form-pit"),function(v,k){
								return {
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									need:$(v).find(".need option:selected").attr("need")==0?false:true
								}
							}),
							other_memo:self.find("#other .memo").val()
						}
					};
					$.ajax({
						url: "/api/exhibit/material/"+self.find("#eid").val(),
						type: "put",
						data: data,
						dataType:"json",
						success:function(data){
							alert("添加物料成功");
							location.href = "/client/index";
						},
						error:function(){
							alert("添加物料失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

