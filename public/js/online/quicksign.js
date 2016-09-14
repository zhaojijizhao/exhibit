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
          'click #signClient':'signClient',
          'click #signSend':'signSend'
        },
        render:function(){
        },
        signSend: function(e){
          e.preventDefault();
          if(!this.$el.find("#clientCell").val()){
            alert('请填写手机号');
            return false;
          }
          var data ={
            user:{
              cell:this.$el.find("#clientCell").val()
            }
          };
          $.ajax({
            url: "/api/clientcheck",
            type: "post",
            data: data,
            success:function(data){
              alert("发送成功");
            },
            error:function(e){
              alert(e.responseJSON.msg ? e.responseJSON.msg : "发送失败");
            }
          });
        },
        signClient:function(e){
          e.preventDefault();
          if(!this.$el.find("#clientName").val()){
            alert('请填写姓名');
            return false;
          }
          if(!this.$el.find("#clientCell").val()){
            alert('请填写手机号');
            return false;
          }
          if(!this.$el.find("#clientCode").val()){
            alert('请填写验证码');
            return false;
          }
          if(!this.$el.find("#clientPsw").val()){
            alert('请填写密码');
            return false;
          }
          var data ={
            user:{
              name:this.$el.find("#clientName").val(),
              cell:this.$el.find("#clientCell").val(),
              code:this.$el.find("#clientCode").val(),
              psw:this.$el.find("#clientPsw").val(),
              type:'personal'
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
            error:function(e){
              alert(e.responseJSON.msg ? e.responseJSON.msg : "注册失败");
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});