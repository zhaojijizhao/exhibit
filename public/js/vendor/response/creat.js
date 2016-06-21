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
					Helper.setrefer("/vendor/index");
				},
				el:$("#main"),
				events:{
					'click #offer':'save',
					'change .form-line .form-subpit .total':'totalChange',
					'change .form-line .form-subpit .with_total':'totalChange',
					'change .form-line .form-subpit .catch_total':'totalChange'
				},
				render:function(){
				},
				totalChange:function(){
					var all = 0;
					this.$el.find('.all').each(function(){
						var num = 0;
						$(this).closest('.form-line').find(".total").each(function(){
							num+=parseFloat($(this).val()||0);
						});
						$(this).text(num.toFixed(2));
						all += num;
					});
					all += parseFloat(this.$el.find("#with .with_total").val()||0);
					all += parseFloat(this.$el.find("#with .catch_total").val()||0);
					this.$el.find("#fee .total").val(parseFloat(all*0.12).toFixed(2));
					this.$el.find("#total .total").val(parseFloat(all*1.12).toFixed(2));
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					var data ={
						offer:{
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
									price:parseFloat($(v).find(".price").val()||0),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							hotel_memo:self.find("#hotel .memo").val(),
							hotel_all:parseFloat(self.find("#hotel .all").val()||0),
							dinner:_.map(self.find("#dinner .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									price:parseFloat($(v).find(".price").val()||0),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							dinner_memo:self.find("#dinner .memo").val(),
							dinner_all:parseFloat(self.find("#dinner .all").val()||0),
							car:_.map(self.find("#car .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									price:parseFloat($(v).find(".price").val()||0),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							car_memo:self.find("#car .memo").val(),
							car_all:parseFloat(self.find("#car .all").val()||0),
							area:_.map(self.find("#area .form-pit"),function(v,k){
								return {
									date:new Date($(v).find(".date").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									tearest_need:$(v).find(".tearest_need option:selected").attr("need")==0?false:true,
									price:parseFloat($(v).find(".price").val()||0),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							area_memo:self.find("#area .memo").val(),
							area_all:parseFloat(self.find("#area .all").val()||0),
							other:_.map(self.find("#other .form-pit"),function(v,k){
								return {
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									need:$(v).find(".need option:selected").attr("need")==0?false:true,
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							other_memo:self.find("#other .memo").val(),
							other_all:parseFloat(self.find("#other .all").val()||0),
							with:{
								with_need:self.find("#with .with_need option:selected").attr("need")==0?false:true,
								with_people:parseInt(self.find("#with .with_people").val()||0),
								with_total:parseFloat(self.find("#with .with_total").val()||0),
								catch_need:self.find("#with .catch_need option:selected").attr("need")==0?false:true,
								catch_people:parseInt(self.find("#with .catch_people").val()||0),
								catch_total:parseFloat(self.find("#with .catch_total").val()||0)
							},
							fee:{
								percent:0.12,
								total:parseFloat(self.find("#fee .total").val()||0)
							},
							inv:{
								need:self.find("#invoice .need option:selected").attr("need")==0?false:true,
								type_id:parseInt(self.find("#invoice .type  option:selected").attr("type_id")),
								type_name:self.find("#invoice .type").val(),
							},
							total:parseFloat(self.find("#total .total").val()||0),
							exhibit_id:self.find("#offer").attr("eid")
						}
					};
					$.ajax({
						url: "/api/offer",
						type: "post",
						data: data,
						dataType:"json",
						success:function(data){
							selfthis.data = data;
							alert("发送报价成功");
							location.href = "/vendor/index";
						},
						error:function(){
							alert("发送报价失败");
						}
					});
				}
			});
			var page = new view();
			page.render();
	});
});

