require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var view = Backbone.View.extend({
        initialize:function(){
          _.bind(Helper.initHead, this)(Helper);
        },
        el:$("#main"),
        events:{
          'click #show1':'show1',
          'click #show2':'show2',
          'click #lunch':'lunch',
          'click #bed':'bed',
          'click #ding':'ding',
          'click #wip':'wip'
        },
        render:function(){
        },
        show1:function(e){
          e.preventDefault();
          alert('一间入住成功');
          $("#s1").removeClass('hide');
        },
        show2:function(e){
          e.preventDefault();
          alert('获取房间号成功');
          $("#s2").removeClass('hide');
        },
        lunch:function(e){
          e.preventDefault();
          alert('为您呼叫午餐服务');
        },
        bed:function(e){
          e.preventDefault();
          alert('为您呼叫叫床服务');
        },
        ding:function(e){
          e.preventDefault();
          alert('为您呼叫定时服务');
        },
        wip:function(e){
          e.preventDefault();
          alert('为您呼叫打扫服务');
        },
      });
      var page = new view();
      page.render();
  });
});

