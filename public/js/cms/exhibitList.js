require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tpl = '<table class="tablelist">\
        <thead>\
          <tr>\
            <td>城市</td>\
            <td>会议名称</td>\
            <td>发布人</td>\
            <td>发布时间</td>\
            <td>状态</td>\
            <td>操作</td>\
          </tr>\
        </thead>\
        <tbody>\
          <%for(var i = 0; i < list.length;i++ ){\
            var item = list[i]%>\
            <tr>\
              <td><%=item.info.cname%></td>\
              <td><%=item.info.name%></td>\
              <td><%=item.info.clientname%></td>\
              <td><%=item.created_at%></td>\
              <td>\
                <%if(item.state==0){%><span class="blue">待审核</span><%}%>\
                <%if(item.state==1){%><span class="green">待报价</span><%}%>\
                <%if(item.state==2){%><span class="red">已确认</span><%}%>\
                <%if(item.state==3){%><span class="orange">已完成</span><%}%>\
                <%if(item.state==4){%><span class="blue">审核未通过</span><%}%>\
              </td>\
              <td><a href="/cms/exhibitdetail?eid=<%=item._id%>">查看详情</a></td>\
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
            url:'/api/cmsexhibitlist',
            type: 'get',
            dataType: 'json',
            success:function(data){
              $('#list').html(_.template(tpl)({list:data}));
            },
            error:function(){
              alert('获取信息失败');
            }
          });
        }
      });
      var page = new view();
      page.render();
  });
});