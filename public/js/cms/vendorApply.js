require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tpl = '<table class="cmstable">\
        <thead>\
          <tr>\
            <td width="7%">公司名称</td>\
            <td width="7%">公司地址</td>\
            <td width="7%">所属行业</td>\
            <td width="7%">姓名</td>\
            <td width="7%">联系方式</td>\
            <td width="7%">处理</td>\
          </tr>\
        </thead>\
        <tbody id="tablebody">\
          <%for(var k=0; k< applys.length; k++){\
            var apply = applys[k]%>\
            <tr id="<%=apply._id%>">\
              <td class="company" data-info="<%=apply.company%>" ><%=apply.company%></td>\
              <td class="address" data-info="<%=apply.address%>" ><%=apply.address%></td>\
              <td class="field" data-info="<%=apply.field%>" ><%=apply.field%></td>\
              <td class="name" data-info="<%=apply.name%>" ><%=apply.name%></td>\
              <td class="cell" data-info="<%=apply.cell%>" ><%=apply.cell%></td>\
              <td><span class="deal">完成</span></td>\
            </tr>\
          <%}%>\
        </tbody>\
      </table>';
      var view = Backbone.View.extend({
        initialize:function(){
        },
        el:$("#main"),
        events:{
        },
        render:function(){
          var _this = this;
          $.ajax({
            url:'/api/apply',
            type: 'get',
            data:{
              type: 'vendor'
            },
            dataType: 'json',
            success:function(data){
              $('#list').html(_.template(tpl)({applys:data}));
            },
            error:function(){
              alert('获取信息失败');
            }
          });
          $(document).on('click','.deal',function(){
            var tr = $(this).closest('tr');
            var data = {
              apply:{
                _id:tr.attr('id'),
                company: tr.find('.company').attr('data-info'),
                address: tr.find('.address').attr('data-info'),
                field: tr.find('.field').attr('data-info'),
                name: tr.find('.name').attr('data-info'),
                cell: tr.find('.cell').attr('data-info'),
                type:'vendor',
                state:1
              }
            }
            $.ajax({
              url:'/api/applyset',
              type: 'post',
              data: data,
              dataType: 'json',
              success:function(data){
                alert('完成成功');
                location.reload();
              },
              error:function(){
                alert('完成失败');
              }
            });
          });
        }
      });
      var page = new view();
      page.render();
  });
});