require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tabletemp = '<%_.each(list,function(v,k){%>\
          <tr>\
            <td><%=v.name%></td>\
            <!--<td><%=v.cell%></td>-->\
            <td><%=v.psw%></td>\
          </tr>\
        <%})%>';
      var view = Backbone.View.extend({
        initialize:function(){
          if(Helper.islogin()){
            this.user = Helper.getlogin();
            var temp = _.template(Helper.template.onlineLoginTemplate);
            $(".toplink").html(temp(this.user));
            $("#exit").bind("click",function(e){
              e.preventDefault();
              Helper.deletelogin();
              location.href="/online/index";
            });
            if(this.user.type=="client"){
              $(".nav .vendor").remove();
            }else if(this.user.type=="vendor"){
              $(".nav .client").remove();
            }
          }else{
            $(".nav .client,.nav .vendor").remove();
          }
        },
        el:$("#main"),
        events:{
          'click #creat': 'creat',
        },
        render:function(){
          var _this = this;
          $.ajax({
            url: '/api/accountget/'+_this.user._id,
            type: 'get',
            dataType: 'json',
            success:function(data){
              if(data && data.length > 0){
                _this.$el.find('#tablelist').html(_.template(tabletemp)({list:data}));
              }
            }
          });
        },
        creat: function() {
          var _this = this;
          var data = {
            user: [],
          }
          var base = parseInt(Math.random()*10000);
          for(var i = 0; i < 100; i++){
            var item = {
              name: _this.user.name + base + i,
              cell: '',
              cid:_this.user._id,
              psw: parseInt(Math.random()*1000000).toString()
            }
            data.user.push(item);
          }
          $.ajax({
            url: '/api/accountcreat',
            type: 'post',
            dataType: 'json',
            data: data,
            success:function(data){
              if(data.succ && data.succ.length > 0){
                alert("成功生成"+data.succ.length+"条帐号");
              }
              location.reload();
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});