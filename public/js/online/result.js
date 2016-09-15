require(['/js/public/base.js'],function(Base){
	Base.setRequirejs();
	require(['jquery','underscore','backbone','helper','vue'],
		function($,_,Backbone,Helper,Vue){
			var page = Vue.extend({
				template: $('#tpl').html(),
				data: function(){
					return {
						user: {},
						offer: {},
						vendor: {},
						client: {},
						isClient: false,
						isVendor: false,
						othertype: ["摄影/摄像","胸牌制作","X展架/易拉宝","背景板","横幅","资料打印","礼品制作"],
						checklist: ['area','car','dinner','fee','hotel','other','sth','with'],
						feetype: ["不收","6%","12%"],
						hoteltype: ["大床房","双床房","行政房","套房"],
						areatype: ["剧院","课桌","U型","鱼骨","董事会"],
						dinnertype: ["无指定餐厅","自助","围桌"],
						cartype: ["轿车（5座）","商务车（21座）","考斯特（19座）","中巴车（33座）","大巴车（45座）","大巴车（53座）"],
						carusage: ["接送机","全天用车"],
						defaultData:{
							hotel:{
								type_id:1,
								type_name: "大床房",
								name:'',
								price:0,
								date_start: null,
								date_end: null,
								days: 0,
								room:0,
								total:0
							},
							area:{
								date_start: null,
								date_end: null,
								days: 0,
								offerAreaService:[],
								people:0,
								price:0,
								total:0,
								type_id:1,
								type_name:'',
							},
							car:{
								days: 0,
								people:0,
								price:0,
								total:0,
								type_id:1,
								type_name:'',
								usage:0
							},
							dinner:{
								date_start: null,
								date_end: null,
								days: 0,
								people:0,
								price:0,
								total:0,
								type_id:1,
								type_name:'',
							},
							other:{
								need: false,
								total:0,
								type_id:1,
								type_name:'',
							},
							sth:{
								name: '',
								people:0,
								price:0,
								total:0
							}
						}
					};
				},
				methods: {
					topdf: function(){
						location.href = location.href.replace('result','resultpdf');
					},
					deal:function(obj,type,val){
						$.ajax({
							url:'/api/offercheck/'+this.offer._id,
							data:{
								id: obj._id,
								type: type,
								val: val,
							},
							type:'put',
							dataType:'json',
							success:function(){
								alert('确认成功');
								obj.checked = val;
							},
							error:function(){
								alert('确认失败');
							}
						});
					},
					confirm: function(obj,type){
						_.bind(this.$options.methods.deal,this)(obj,type,1);
					},
					refuse: function(obj,type){
						_.bind(this.$options.methods.deal,this)(obj,type,2);
					},
					complete: function(){
						var _this = this;
						$.ajax({
							url:'/api/offerall/'+this.offer._id,
							type:'put',
							dataType:'json',
							success:function(){
								alert('确认成功');
								_this.offer.state = 3;
							},
							error:function(){
								alert('确认失败');
							}
						});
					},
					add: function(type){
						this.offer[type].push(_.clone(this.defaultData[type]));
					},
					select: function(model,typestr){
						if(typestr == 'carusage' || typestr == 'fee'){
							if(typestr == 'fee'){
								_.bind(this.$options.methods.count,this)();
							}
						}else{
							model.type_name = this[typestr][model.type_id-1];
						}
					},
					timeset: function(model,section,value){
						if(value){
							model[section] = new Date(value);
							if(model.date_end && model.date_start){
								model.days = Math.floor((new Date(model.date_end) - new Date(model.date_start))/1000/60/60/24)+1;
								_.bind(this.$options.methods.count,this)();
							}
						}
					},
					count: function(){
						var _this = this;
						_this.offer.area_all = 0;
						_.each(_this.offer.area,function(v,k){
							v.total = parseFloat(v.days)*parseFloat(v.people)*parseFloat(v.price);
							_this.offer.area_all += v.total;
						});
						_this.offer.car_all = 0;
						_.each(_this.offer.car,function(v,k){
							v.total = parseFloat(v.days)*parseFloat(v.people)*parseFloat(v.price);
							_this.offer.car_all += v.total;
						});
						_this.offer.dinner_all = 0;
						_.each(_this.offer.dinner,function(v,k){
							v.total = parseFloat(v.days)*parseFloat(v.people)*parseFloat(v.price);
							_this.offer.dinner_all += v.total;
						});
						_this.offer.hotel_all = 0;
						_.each(_this.offer.hotel,function(v,k){
							v.total = parseFloat(v.days)*parseFloat(v.room)*parseFloat(v.price);
							_this.offer.hotel_all += v.total;
						});
						_this.offer.other_all = 0;
						_.each(_this.offer.other,function(v,k){
							_this.offer.other_all += parseFloat(v.total);
						});
						_this.offer.sth_all = 0;
						_.each(_this.offer.sth,function(v,k){
							v.total = parseFloat(v.people)*parseFloat(v.price);
							_this.offer.sth_all += v.total;
						});
						_this.offer.with.with_total = parseFloat(_this.offer.with.with_people)*parseFloat(_this.offer.with.with_people_num)*parseFloat(_this.offer.with.with_price);
						_this.offer.with.catch_total = parseFloat(_this.offer.with.catch_people)*parseFloat(_this.offer.with.catch_people_num)*parseFloat(_this.offer.with.catch_price);
						_this.offer.total = _this.offer.area_all + 
							_this.offer.car_all+ 
							_this.offer.dinner_all+ 
							_this.offer.hotel_all+
							_this.offer.other_all+ 
							_this.offer.sth_all+ 
							_this.offer.with.with_total+ 
							_this.offer.with.catch_total;
						switch(_this.offer.fee.percent){
							case '0':
								_this.offer.fee.total = 0;
								break;
							case '1':
								_this.offer.fee.total = 0.06*_this.offer.total;
								break;
							case '2':
								_this.offer.fee.total = 0.12*_this.offer.total;
								break;
						}
						_this.offer.total += _this.offer.fee.total;
					},
					save: function(){
						var _this = this;
						$.ajax({
							url:'/api/offer/'+this.offer._id,
							data:{
								offer: _this.offer
							},
							type:'put',
							dataType:'json',
							success:function(){
								alert('保存成功');
							},
							error:function(){
								alert('保存失败');
							}
						});
					}
				},
				computed:{
					isClient: function(){
						return this.user._id == this.client._id;
					},
					isVendor: function(){
						return this.user._id == this.vendor._id;
					},
					isAllCheck: function(){
						var _this = this;
						var result = true;
						_.each(_this.checklist,function(v,k){
							var attr = _this.offer[v];
							if(attr.length >= 0){
								_.each(attr,function(av,ak){
									if(av.checked != 1){
										result = false;
									}
								});
							}else{
								if(attr.checked != 1){
									result = false;
								}
							}
						});
						return result;
					}
				},
				ready: function(){
					var _this = this;

					if(!Helper.islogin()){
						alert('请先登录');
						location.href = "/online/index";
					}
					_.bind(Helper.initHead, this)(Helper);

					_this.user = Helper.getlogin();
					$.ajax({
						url: '/api/result/'+location.href.split('result/',2)[1],
						data: {},
						type: "get",
						dataType: 'json',
						success:function(data){
							_this.offer = data.offer;
							_this.vendor = data.vendor;
							_this.client = data.client;
						},
						error: function(){
							alert("获取报表信息失败");
						}
					})
				}
			});
			var vm = new page({el:"#app"});
	});
});

