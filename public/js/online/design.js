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
          'click #submit':'submit'
        },
        render:function(){
        },
        submit:function(e){
          e.preventDefault();
          var data ={
            design:{
              user:Helper.getlogin(),
              cid:this.$el.find("#city").val(),
              people:this.$el.find("#people").val(),
              date:this.$el.find("#date").val(),
              hotel:this.$el.find("#hotel").val(),
              price:this.$el.find("#price").val()
            }
          };
          $.ajax({
            url: "/api/design",
            type: "post",
            data: data,
            dataType:'json',
            success:function(data){
              alert("提交定制成功");
            },
            error:function(e){
              alert(e.responseJSON.msg ? e.responseJSON.msg : "提交定制失败");
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});