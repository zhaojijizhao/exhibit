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
          'click #callback':'callback'
        },
        render:function(){
        },
        callback:function(e){
          e.preventDefault();
          var data ={
            user:{
              name:this.$el.find("#vendorName").val(),
              cell:this.$el.find("#vendorCell").val()
            }
          };
          $.ajax({
            url: "/api/vendorcallback",
            type: "post",
            data: data,
            dataType:"json",
            success:function(data){
              alert("密码已经发送到您的手机，请查收！");
            },
            error:function(){
              alert("密码找回失败！");
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});