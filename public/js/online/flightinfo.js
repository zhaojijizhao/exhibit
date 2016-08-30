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
          'click #flightsearch':'search',
          'click #late':'late'
        },
        render:function(){
        },
        search:function(e){
          e.preventDefault();
          $('#s1').removeClass('hide');
        },
        late:function(e){
          e.preventDefault();
          $('#s2').removeClass('hide');
        }
      });
      var page = new view();
      page.render();
  });
});

