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
          'click .toptab li': 'change',
          'click #applyclient':'applyclient',
          'click #applyvendor':'applyvendor'
        },
        render:function(){
        },
        change: function(e){
          $(e.currentTarget).addClass('on')
            .siblings().removeClass('on');
          var index =  $(e.currentTarget).index();
          $('.all-form>div:eq('+index+')').removeClass('hide')
            .siblings().addClass('hide');
        },
        applyclient: function(e){
          e.preventDefault();
          var data ={
            apply:{
              company: this.$el.find('#clientcompany').val(),
              address: this.$el.find('#clientaddress').val(),
              field: this.$el.find('#clientfield').val(),
              name: this.$el.find('#clientname').val(),
              cell: this.$el.find('#clientcell').val(),
              type: 'client'
            }
          };
          $.ajax({
            url: "/api/apply",
            type: "post",
            data: data,
            dataType:'json',
            success:function(data){
              alert("申请成功");
            },
            error:function(){
              alert(e.responseJSON.msg ? e.responseJSON.msg : "申请失败");
            }
          });
        },
        applyvendor: function(e){
          e.preventDefault();
          var data ={
            apply:{
              company: this.$el.find('#vendorcompany').val(),
              address: this.$el.find('#vendoraddress').val(),
              field: this.$el.find('#vendorfield').val(),
              name: this.$el.find('#vendorname').val(),
              cell: this.$el.find('#vendorcell').val(),
              type: 'vendor'
            }
          };
          $.ajax({
            url: "/api/apply",
            type: "post",
            data: data,
            dataType:'json',
            success:function(data){
              alert("申请成功");
            },
            error:function(){
              alert(e.responseJSON.msg ? e.responseJSON.msg : "申请失败");
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});