require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tabletemp = '<%_.each(list,function(v,k){%>\
          <tr id="<%=v._id%>">\
            <td class="name"><%=v.name%></td>\
            <td class="cell"><input type="tel" value="<%=v.cell%>" /></td>-->\
            <td class="psw"><%=v.psw%></td>\
            <td><span class="account-save save">保存</span></td>\
          </tr>\
        <%})%>';
      var view = Backbone.View.extend({
        initialize:function(){
          _.bind(Helper.initHead, this)(Helper);
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
          $(document).on('click','.save',function(){
            var tr = $(this).closest('tr');
            $.ajax({
              url: '/api/vendorupdate',
              type: 'post',
              data:{
                user:{
                  _id:tr.attr('id'),
                  name:tr.find('.name').html(),
                  cell:tr.find('.cell input').val(),
                  psw:tr.find('.psw').html()
                }
              },
              dataType: 'json',
              success:function(data){
                alert('更新手机成功');
                location.reload();
              }
            });
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