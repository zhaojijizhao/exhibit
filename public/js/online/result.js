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
					_.bind(Helper.initHead, this)(Helper);
				},
				el:$("#main"),
				events:{
				},
				render:function(){
					var user =Helper.getlogin();
					if((user.type == "client" || user.type == "personal") && $('.result-table').attr('data-state')==2){
						$(".dd").removeClass('hide');
						$(".complete").removeClass('hide');
					}
					$(document).on('click','.dd button',function(e){
						e.preventDefault();
						var tr = $(this).closest('tr');
						$.ajax({
							url:'/api/offercheck/'+$('.result-table').attr('data-id'),
							data:{
								id: tr.attr('data-id'),
								type: tr.attr('data-type')
							},
							type:'put',
							dataType:'json',
							success:function(){
								alert('确认成功');
								location.reload();
							},
							error:function(){
								alert('确认失败');
							}
						});
					});
					$(document).on('click','.complete',function(e){
						e.preventDefault();
						var tr = $(this).closest('tr');
						$.ajax({
							url:'/api/offerall/'+$('.result-table').attr('data-id'),
							type:'put',
							dataType:'json',
							success:function(){
								alert('确认成功');
								location.reload();
							},
							error:function(){
								alert('确认失败');
							}
						});
					});
				}
			});
			var page = new view();
			page.render();
	});
});

