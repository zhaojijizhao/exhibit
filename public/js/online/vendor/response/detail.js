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
					var temp = _.template(Helper.template.onlineLoginTemplate);
					$(".nav .client").remove();
					$(".toplink").html(temp(this.user));
					$("#exit").bind("click",function(e){
						e.preventDefault();
						Helper.deletelogin();
						location.href="/online/index";
					});
				},
				el:$("#main"),
				events:{
					'click #update':'save',
					'change #fee .percent':'totalChange',
					'change .form-line .form-subpit .price':'totalChange',
					'change .form-line#other .form-subpit .total':'totalChange',
					'change .form-line .form-subpit .with_total':'totalChange',
					'change .form-line .form-subpit .with_price':'totalChange',
					'change .form-line .form-subpit .catch_total':'totalChange',
					'change .form-line .form-subpit .catch_price':'totalChange',
					'change .form-line#fee .form-subpit .percent':'totalChange'
				},
				totalChange:function(){
					var totalall = 0,
						hotelall = 0,
						areaall = 0,
						dinnerall = 0,
						carall = 0,
						otherall = 0,
						with_total = 0,
						catch_total = 0,
						feeall=0;
					this.$el.find('#hotel .form-pit').each(function(){
						var price = parseFloat($(this).find('.price').val()||0).toFixed(2),
							room = parseInt($(this).find('.room').val()||0),
							days = parseInt($(this).find('.days').val()||0);
						var total = price*room*days;
						$(this).find(".total").val(total.toFixed(2));
						hotelall += total;
						totalall += total;
					});
					this.$el.find('#hotel .all').text(hotelall.toFixed(2));

					this.$el.find('#area .form-pit').each(function(){
						var price = parseFloat($(this).find('.price').val()||0),
							people = parseInt($(this).find('.people').val()||0),
							days = parseInt($(this).find('.days').val()||0);
						var total = price*people*days;
						$(this).find(".total").val(total.toFixed(2));
						areaall += total;
						totalall += total;
					});
					this.$el.find('#area .all').text(areaall.toFixed(2));

					this.$el.find('#dinner .form-pit').each(function(){
						var price = parseFloat($(this).find('.price').val()||0),
							people = parseInt($(this).find('.people').val()||0),
							days = parseInt($(this).find('.days').val()||0);
						var total = price*people*days;
						$(this).find(".total").val(total.toFixed(2));
						dinnerall += total;
						totalall += total;
					});
					this.$el.find('#dinner .all').text(dinnerall.toFixed(2));

					this.$el.find('#car .form-pit').each(function(){
						var price = parseFloat($(this).find('.price').val()||0),
							people = parseInt($(this).find('.people').val()||0),
							days = parseInt($(this).find('.days').val()||0);
						var total = price*people*days;
						$(this).find(".total").val(total.toFixed(2));
						carall += total;
						totalall += total;
					});
					this.$el.find('#car .all').text(carall.toFixed(2));

					this.$el.find('#other .total').each(function(){
						var total = parseFloat($(this).val()||0);
						$(this).val(total.toFixed(2));
						otherall += total;
						totalall += total;
					});
					
					this.$el.find('#other .all').text(otherall.toFixed(2));

					with_total = parseFloat(this.$el.find("#with .with_price").val()||0)*parseFloat(this.$el.find("#with .with_people").val()||0);
					this.$el.find("#with .with_total").val(with_total.toFixed(2));
					totalall += with_total;

					catch_total = parseFloat(this.$el.find("#with .catch_price").val()||0)*parseFloat(this.$el.find("#with .catch_people").val()||0);
					this.$el.find("#with .catch_total").val(catch_total.toFixed(2));
					totalall += catch_total;

					var percenttype = this.$el.find("#fee .percent option:selected").attr("percent");
					switch(percenttype){
						case "1":
							feeall = totalall*0;
							break;
						case "2":
							feeall = totalall*0.06;
							break;
						case "3":
							feeall = totalall*0.12;
							break;
						default:
							break;
					}
					totalall += feeall;
					this.$el.find("#fee .total").text(feeall.toFixed(2));

					this.$el.find("#total .total").val(totalall.toFixed(2));
				},
				save:function(e){
					e.preventDefault();
					var selfthis = this;
					var self = this.$el;
					var data ={
						offer:{
							uid:this.user._id,
							uname:this.user.name,
							info:{
								cid: parseInt(self.find("#city option:selected").attr("cid")),
								cname:self.find("#city").val(),
								name:self.find("#name").val(),
								datetime:new Date(self.find("#datetime").val()||Date.now()),
								place:self.find("#place").val(),
								agent:self.find("#agent").val(),
								agentcell:self.find("#agentcell").val()
							},
							hotel:_.map(self.find("#hotel .form-pit"),function(v,k){
								return {
									date_start:new Date($(v).find(".date_start").val()||Date.now()),
									date_end:new Date($(v).find(".date_end").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									name:$(v).find(".name").val(),
									price:parseFloat($(v).find(".price").val()||0),
									room:parseInt($(v).find(".room").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									total:parseFloat($(v).find(".total").val()||0)
								}
							}),
							hotel_memo:self.find("#hotel .memo").val(),
							hotel_all:parseFloat(self.find("#hotel .all").val()||0),
							dinner:_.map(self.find("#dinner .form-pit"),function(v,k){
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
							dinner_memo:self.find("#dinner .memo").val(),
							dinner_all:parseFloat(self.find("#dinner .all").val()||0),
							car:_.map(self.find("#car .form-pit"),function(v,k){
								return {
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
								with_price:parseFloat(self.find("#with .with_price").val()||0),
								with_total:parseFloat(self.find("#with .with_total").val()||0),
								catch_need:self.find("#with .catch_need option:selected").attr("need")==0?false:true,
								catch_people:parseInt(self.find("#with .catch_people").val()||0),
								catch_price:parseFloat(self.find("#with .catch_price").val()||0),
								catch_total:parseFloat(self.find("#with .catch_total").val()||0)
							},
							fee:{
								percent:parseInt(self.find("#fee .percent option:selected").attr("percent")),
								memo:self.find("#fee .memo").val(),
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
						url: "/api/offer/"+self.find('#update').attr('oid'),
						type: "put",
						data: data,
						dataType:"json",
						success:function(data){
							selfthis.data = data;
							alert("发送报价成功");
							location.href = "/online/index";
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

