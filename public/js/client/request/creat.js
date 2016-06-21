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
							uid:this.user._id,
							info:{
								cid: parseInt(self.find("#city option:selected").attr("cid")),
								cname:self.find("#city").val(),
								name:self.find("#name").val(),
								datetime:new Date(self.find("#datetime").val()||Date.now()),
								place:self.find("#place").val(),
								agent:self.find("#agent").val()
							},
							hotel:_.map(self.find("#hotel .form-pit"),function(v,k){
								return {
									date_start:new Date($(v).find(".date_start").val()||Date.now()),
									date_end:new Date($(v).find(".date_end").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							hotel_memo:self.find("#hotel .memo").val(),
							dinner:_.map(self.find("#dinner .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							dinner_memo:self.find("#dinner .memo").val(),
							car:_.map(self.find("#car .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							car_memo:self.find("#car .memo").val(),
							area:_.map(self.find("#area .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									tearest_need:$(v).find(".tearest_need option:selected").attr("need")==0?false:true,
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							area_memo:self.find("#area .memo").val(),
							other:_.map(self.find("#other .form-pit"),function(v,k){
								return {
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									need:$(v).find(".need option:selected").attr("need")==0?false:true
								}
							}),
							other_memo:self.find("#other .memo").val(),
							with:{
								with_need:self.find("#with .with_need option:selected").attr("need")==0?false:true,
								with_people:parseInt(self.find("#with .with_people").val()||0),
								catch_need:self.find("#with .catch_need option:selected").attr("need")==0?false:true,
								catch_people:parseInt(self.find("#with .catch_people").val()||0)
							},
							inv:{
								need:self.find("#invoice .need option:selected").attr("need")==0?false:true,
								type_id:parseInt(self.find("#invoice .type  option:selected").attr("type_id")),
								type_name:self.find("#invoice .type").val(),
							}
						}
					};
					$.ajax({
						url: "/api/exhibit",
						type: "post",
						data: data,
						dataType:"json",
						success:function(data){
							selfthis.data = data;
							alert("创建需求成功");
							_.bind(selfthis.renderPeople,selfthis)();
							
						},
						error:function(){
							alert("创建需求失败");
						}
					});
				},
				renderPeople:function(){
					var selfthis = this;
					var self = this.$el;
					$.ajax({
						url: "/api/user/list",
						type: "get",
						dataType:"json",
						success:function(data){
							var temp = _.template(Helper.template.userTemplate);
							self.html(temp({user:data}));
							self.find(".send").on('click',_.bind(selfthis.sendPeople,selfthis));
						},
						error:function(){
							alert('获取用户列表失败');
							location.href = "/client/index";
						}
					});
				},
				sendPeople:function(e){
					var selfthis = this;
					var self = this.$el;
					var uid = $(e.currentTarget).attr("uid")
					var data = {
						exhibit_id:selfthis.data._id
					};
					var url = "/api/exhibit/send"+(!!uid?"/byuid/"+uid:"");
					$.ajax({
						url: url,
						type: "post",
						data:data,
						success:function(data){
							alert("发送成功");
							location.href = "/client/index";
						},
						error:function(){
							alert("发送失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

