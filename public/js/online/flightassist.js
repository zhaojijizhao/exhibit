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
          'click #send':'send'
        },
        render:function(){
        },
        show1:function(e){
          e.preventDefault();
          $("#s1").removeClass('hide');
        },
        show2:function(e){
          e.preventDefault();
          $("#s2").removeClass('hide');
        },
        send:function(e){
          e.preventDefault();
          alert('已发送消息');
        }
      });
      var page = new view();
      page.render();
  });
});

