require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tpl = '<table class="cmstable">\
        <thead>\
          <tr>\
            <td width="7%">用户</td>\
            <td width="7%">联系方式</td>\
            <td width="7%">会议城市</td>\
            <td width="7%">会议人数</td>\
            <td width="7%">会议日期</td>\
            <td width="7%">酒店标准</td>\
            <td width="7%">您的预算</td>\
            <td width="7%">处理</td>\
          </tr>\
        </thead>\
        <tbody id="tablebody">\
          <%for(var k=0; k< designs.length; k++){\
            var design = designs[k]%>\
            <tr id="<%=design._id%>">\
              <td class="user" data-info=\'<%=design.userstr%>\' ><%if(design.user){%><%=design.user.name%><%}%></td>\
              <td class="cell" data-info="<%if(design.user){%><%=design.user.cell%><%}%>" ><%if(design.user){%><%=design.user.cell%><%}%></td>\
              <td class="cid" data-info="<%=design.cid%>" >\
                <select id="city" disabled value="<%=design.cid%>">\
                  <%for(var i=0;i<city.length;i++){%>\
                    <optgroup label="<%=city[i].label%>">\
                      <%for(var j=0;j<city[i].cities.length;j++){%>\
                        <option value="<%=city[i].cities[j].id%>" >\
                          <%=city[i].cities[j].name%>\
                        </option>\
                      <%}%>\
                    </optgroup>\
                  <%}%>\
                </select>\
              </td>\
              <td class="people" data-info="<%=design.people%>" ><%=design.people%></td>\
              <td class="date" data-info="<%=design.date%>" ><%=new Date(design.date).toLocaleDateString()%></td>\
              <td class="hotel" data-info="<%=design.hotel%>" ><%=design.hotel%></td>\
              <td class="price" data-info="<%=design.price%>" ><%=design.price%></td>\
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
          var city = Helper.city;
          $.ajax({
            url:'/api/design',
            type: 'get',
            dataType: 'json',
            success:function(data){
              _.each(data,function(v,k){
                if(v.user){
                  v.userstr = JSON.stringify(v.user);
                }else{
                  v.userstr = '';
                }
              });
              $('#list').html(_.template(tpl)({designs:data,city:city}));
            },
            error:function(){
              alert('获取信息失败');
            }
          });
          $(document).on('click','.deal',function(){
            var tr = $(this).closest('tr');
            var data = {
              design:{
                _id:tr.attr('id'),
                user: JSON.parse(tr.find('.user').attr('data-info')||"{}"),
                cid: tr.find('.cid').attr('data-info'),
                people: tr.find('.people').attr('data-info'),
                date: tr.find('.date').attr('data-info'),
                hotel: tr.find('.hotel').attr('data-info'),
                price: tr.find('.price').attr('data-info'),
                state:1
              }
            };
            $.ajax({
              url:'/api/designset',
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