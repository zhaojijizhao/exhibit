require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper'],
		function($,_,Backbone,Helper){
			var view = Backbone.View.extend({
				initialize:function(){
					if(!Helper.islogin()){
						alert('请先登录');
						location.href = "/online/index";
					}
					this.user = Helper.getlogin();
					if(this.user.type!="client"  && this.user.type!="personal"){
						alert('请先登录客户账号');
						location.href = "/online/index";
					}
					_.bind(Helper.initHead, this)(Helper);
				},
				el:$("#main"),
				events:{
					'click .addbtn':'edit',
					'click #save':'save'
				},
				render:function(){
					//date计算
					$(document).on('change','input[type=date]',function(){
					  var input = $(this);
					  var inputclass = input.attr('class');
					  var formpit = input.closest('.form-pit');
					  var startinput,endinput;
					  function gettheother(type) {
					    var theinput,theother;
					    theinput = input;
					    if(type == 1){
					      inputclass = inputclass.replace('start','end');
					    }else if(type == 2){
					      inputclass = inputclass.replace('end','start');
					    }
					    var chooseinput = formpit.find('.'+inputclass);
					    if(chooseinput.length>0){
					      theother = $(chooseinput[0]);
					    }
					    if(type == 1){
					      startinput = theinput;
					      endinput = theother;
					    }else if(type == 2){
					      endinput = theinput;
					      startinput = theother;
					    }
					  }
					  if(inputclass.indexOf('start')>-1){
					    gettheother(1);
					  }else if(inputclass.indexOf('end')>-1){
					    gettheother(2);
					  }
					  var dayinput = formpit.find('.days');
					  if(startinput && endinput && startinput.val() && endinput.val()){
					    if(dayinput.length>0){
					      dayinput = $(dayinput[0]);
					      if(dayinput.prev('label').html() == '天数' ){
					        var minus = new Date(endinput.val()) - new Date(startinput.val());
					        if(minus >= 0) {
					          minus = Math.ceil(minus/1000/60/60/24)+1;
					          dayinput.val(minus)
					        }
					      }
					    }
					  }
					});
					$('body').append(_.template($("#infopop").html())());
					$('.next').on('click',_.bind(this.next,this));
					$('.prev').on('click',_.bind(this.prev,this));
					$('.finish').on('click',_.bind(this.finish,this));
					$('.plusbtn').on('click',_.bind(this.addone,this));
					$('.close').on('click',function(){
						$('.pop').remove();
					});
				},
				next:function(e){
					e.preventDefault();
					var target=$($(e.target).closest(".pop"));
					this.savepop(target);
					var popname = target.closest(".pop").attr("name");
					$(".pop").remove();
					var next = $("#"+popname).next().html();
					$('body').append(_.template(next)());
					$('.next').on('click',_.bind(this.next,this));
					$('.prev').on('click',_.bind(this.prev,this));
					$('.finish').on('click',_.bind(this.finish,this));
					$('.plusbtn').on('click',_.bind(this.addone,this));
					$('.close').on('click',function(){
						$('.pop').remove();
					});
				},
				prev:function(e){
					e.preventDefault();
					var target= $($(e.target).closest(".pop"));
					this.savepop(target);
					var popname = target.closest(".pop").attr("name");
					$(".pop").remove();
					var prev = $("#"+popname).prev().html();
					$('body').append(_.template(prev)());
					$('.next').on('click',_.bind(this.next,this));
					$('.prev').on('click',_.bind(this.prev,this));
					$('.finish').on('click',_.bind(this.finish,this));
					$('.plusbtn').on('click',_.bind(this.addone,this));
					$('.close').on('click',function(){
						$('.pop').remove();
					});
				},
				finish:function(e){
					var target= $($(e.target).closest(".pop"));
					this.savepop(target);
					$(".pop").remove();
				},
				savepop:function(target){
					var popname = target.closest(".pop").attr("name");

					if(popname=="infopop"){
						_.each(target.find("input,textarea"),function(v,k){
							if($(v).attr("type")!="date"){
								$("#"+$(v).attr("class")).val($(v).val());
							}else{
								var d = $(v).val();
								$("#"+$(v).attr("class")).val(d);
							}
						});
						_.each(target.find("select"),function(v,k){
							if($(v).attr('class')=='city'){
								var cid = $(v).find("option:selected").attr('cid');
								$("#"+$(v).attr("class")).find('option').removeAttr("selected");
								$($("#"+$(v).attr("class")).find('option[cid='+ cid +']')).attr('selected','selected');
							}else{
								var i = $(v).find("option:selected").index();
								$("#"+$(v).attr("class")).find('option').removeAttr("selected");
								$($("#"+$(v).attr("class")).find('option')[i]).attr('selected','selected');
							}
						});
					}else{
						var formline = $("#"+popname.split('pop')[0]); 
						var fp = $(formline.find(".form-pit")[0]).clone();
						formline.find(".form-pit").remove();
						_.each(target.find(".form-pit"),function(v,k){
							var temp = fp.clone();
							_.each($(v).find("input,textarea"),function(v1,k1){
								if($(v1).attr("type")!="date"){
									temp.find("."+$(v1).attr("class")).val($(v1).val());
								}else{
									var d = $(v1).val();
									temp.find("."+$(v1).attr("class")).val(d);
								}
							});
							_.each($(v).find("select"),function(v1,k1){
								var i = $(v1).find("option:selected").index();
								temp.find("."+$(v1).attr("class")).find('option').removeAttr("selected");
								$(temp.find("."+$(v1).attr("class")).find('option')[i]).attr('selected','selected');
							});
							formline.find(".line-title").after(temp);
						});
						if(target.find('.memo').length>0){
							formline.find('.memo').val(target.find('.memo').val());
						}
					}
				},
				edit:function(){
				},
				addone:function(e){
					e.preventDefault();
					var item = $(e.currentTarget).closest('.pop').find('.form-pit:last');
					item.after(item.clone());
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
								clientname:this.user.name,
								datetime:new Date(self.find("#datetime").val()||Date.now()),
								place:self.find("#place").val(),
								agent:self.find("#agent").val(),
								agentcell:parseInt(self.find("#agentcell").val())
							},
							hotel:_.map(self.find("#hotel .form-pit"),function(v,k){
								return {
									date_start:new Date($(v).find(".date_start").val()||Date.now()),
									date_end:new Date($(v).find(".date_end").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									name:$(v).find(".name").val(),
									room:parseInt($(v).find(".room").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							hotel_memo:self.find("#hotel .memo").val(),
							dinner:_.map(self.find("#dinner .form-pit"),function(v,k){
								return {
									date_start:new Date($(v).find(".date_start").val()||Date.now()),
									date_end:new Date($(v).find(".date_end").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0)
								}
							}),
							dinner_memo:self.find("#dinner .memo").val(),
							car:_.map(self.find("#car .form-pit"),function(v,k){
								return {
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
									people:parseInt($(v).find(".people").val()||0),
									days:parseInt($(v).find(".days").val()||0),
									usage:parseInt($(v).find(".usage").val()||0)
								}
							}),
							car_memo:self.find("#car .memo").val(),
							area:_.map(self.find("#area .form-pit"),function(v,k){
								return {
									date_start:new Date($(v).find(".date_start").val()||Date.now()),
									date_end:new Date($(v).find(".date_end").val()||Date.now()),
									type_id:parseInt($(v).find(".type  option:selected").attr("type_id")),
									type_name:$(v).find(".type").val(),
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
							sth:_.map(self.find("#sth .form-pit"),function(v,k){
								return {
									name:$(v).find(".name").val(),
									people:parseInt($(v).find(".people").val()||0)
								}
							}),
							sth_memo:self.find("#sth .memo").val(),
							with:{
								with_need:self.find("#with .with_need option:selected").attr("need")==0?false:true,
								with_people:parseInt(self.find("#with .with_people").val()||0),
								with_people_num:parseInt(self.find("#with .with_people_num").val()||0),
								catch_need:self.find("#with .catch_need option:selected").attr("need")==0?false:true,
								catch_people:parseInt(self.find("#with .catch_people").val()||0),
								catch_people_num:parseInt(self.find("#with .catch_people_num").val()||0)
							},
							inv:{
								need:self.find("#invoice .need option:selected").attr("need")==0?false:true,
								type_id:parseInt(self.find("#invoice .type  option:selected").attr("type_id")),
								type_name:self.find("#invoice .type").val(),
							}
						}
					};
					data.exhibit.state = 0;
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
						url: "/api/user/vendorlist",
						type: "get",
						dataType:"json",
						success:function(data){
							var temp = _.template(Helper.template.userTemplate);
							self.html(temp({user:data}));
							self.find(".send").on('click',_.bind(selfthis.sendPeople,selfthis));
						},
						error:function(){
							alert('获取用户列表失败');
							location.href = "location/index";
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
							location.href = "/online/index";
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

