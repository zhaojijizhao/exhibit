require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var view = Backbone.View.extend({
        initialize:function(){
          _.bind(Helper.initUnloginHead, this)(Helper);
        },
        el:$("#main"),
        events:{
          'click #signClient':'signClient'
        },
        render:function(){
        },
        signClient:function(e){
          e.preventDefault();
          var data ={
            user:{
              name:this.$el.find("#clientName").val(),
              cell:this.$el.find("#clientCell").val(),
              psw:this.$el.find("#clientPsw").val()
            }
          };
          $.ajax({
            url: "/api/clientuser",
            type: "post",
            data: data,
            dataType:'json',
            success:function(data){
              alert("注册成功");
              Helper.setlogin(data);
              location.href = "/online/client/creat";
            },
            error:function(){
              alert("注册失败");
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});