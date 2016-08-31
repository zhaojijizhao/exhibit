require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tpl = '<table class="cmstable">\
        <thead>\
          <tr>\
            <td width="7%">姓名</td>\
            <td width="7%">用户类型</td>\
            <td width="7%">手机</td>\
            <td width="7%">密码</td>\
            <td width="7%">真实姓名</td>\
            <td width="7%">性别</td>\
            <td width="7%">邮箱</td>\
            <td width="7%">所在城市</td>\
            <td width="7%">公司</td>\
            <td width="7%">创建时间</td>\
            <td width="7%">收到消息</td>\
            <td width="7%">激活状态</td>\
            <td width="8%">操作</td>\
          </tr>\
        </thead>\
        <tbody id="tablebody">\
          <%for(var k=0; k< users.length; k++){\
            var user = users[k]%>\
            <tr id="<%=user._id%>">\
              <td class="name" data-info="<%=user.name%>" ><%=user.name%></td>\
              <td class="type" data-info="<%=user.type%>" ><%=user.type%></td>\
              <td class="cell" data-info="<%=user.cell%>" ><input type="tel" value="<%=user.cell%>" /></td>\
              <td class="psw" data-info="<%=user.psw%>" ><%=user.psw%></td>\
              <td class="realname" data-info="<%=user.realname%>" ><%=user.realname%></td>\
              <td class="gender" data-info="<%=user.gender%>" ><%=user.gender==2?"女":"男"%></td>\
              <td class="mail" data-info="<%=user.mail%>" ><%=user.mail%></td>\
              <td class="city" data-info="<%=user.city%>" >\
                <select value="<%=user.city%>" disabled="disabled">\
                  <% for(var i=0;i<city.length;i++){%>\
                    <optgroup label="<%=city[i].label%>">\
                      <% for(var j=0;j<city[i].cities.length;j++){%>\
                        <option valule="<%=city[i].cities[j].id%>">\
                          <%=city[i].cities[j].name%>\
                        </option>\
                      <%}%>\
                    </optgroup>\
                  <%}%>\
                </select>\
              </td>\
              <td class="company" data-info="<%=user.company%>" ><%=user.company%></td>\
              <td class="created_at" data-info="<%=user.created_at%>" ><%=new Date(user.created_at).toLocaleString()%></td>\
              <td class="receive" data-info="<%=user.receive%>" ><%=user.receive%></td>\
              <td class="state" data-info="<%=user.state%>"><%=user.state%></td>\
              <td>\
                <span class="act">激活</span>\
                <span class="unact">冻结</span>\
                <span class="delete">删除</span>\
                <span class="save">保存</span>\
              </td>\
            </tr>\
          <%}%>\
        </tbody>\
      </table>\
      <p class="title">创建新用户(此处添加用户为企业用户)</p>\
      <table class="cmstable">\
        <thead>\
           <tr>\
            <td>姓名</td>\
            <td>手机</td>\
            <td>密码</td>\
            <td>真实姓名</td>\
            <td>性别</td>\
            <td>邮箱</td>\
            <td>所在城市</td>\
            <td>公司</td>\
            <td>操作</td>\
          </tr>\
        </thead>\
        <tbody id="tablebody">\
            <tr>\
              <td><input class="name"  type="text" placeholder="请输入用户名" /></td>\
              <td><input class="cell"  type="text" placeholder="请输入手机号" /></td>\
              <td><input class="psw"  type="text" placeholder="请输入密码" /></td>\
              <td><input class="realname" type="text" placeholder="请输入真实姓名" /></td>\
              <td>\
                <select class="gender">\
                  <option value="1">男</option>\
                  <option value="2">女</option>\
                </select>\
              </td>\
              <td><input class="mail" type="text" placeholder="请输入邮箱" /></td>\
              <td>\
                <select class="city">\
                  <% for(var i=0;i<city.length;i++){%>\
                    <optgroup label="<%=city[i].label%>">\
                      <% for(var j=0;j<city[i].cities.length;j++){%>\
                        <option value="<%=city[i].cities[j].id%>">\
                          <%=city[i].cities[j].name%>\
                        </option>\
                      <%}%>\
                    </optgroup>\
                  <%}%>\
                </select>\
              </td>\
              <td><input class="company" type="text" placeholder="请输入" /></td>\
              <td>\
                <span class="add">创建</span>\
              </td>\
            </tr>\
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
            url:'/api/cmsgetclientuser',
            type: 'get',
            dataType: 'json',
            success:function(data){
              $('#list').html(_.template(tpl)({users:data,city:Helper.city}));
            },
            error:function(){
              alert('获取信息失败');
            }
          });
          $(document).on('click','.act',function(){
            var btn = $(this);
            var data = {
              user:_this.getUserData(btn)
            };
            data.state = "激活";
            $.ajax({
              url:'/api/cmssetclientuser',
              type: 'post',
              dataType: 'json',
              data:data,
              success:function(data){
                alert('激活成功');
                location.reload();
              },
              error:function(){
                alert('激活失败');
              }
            });
          });
          $(document).on('click','.unact',function(){
            var btn = $(this);
            var data = {
              user:_this.getUserData(btn)
            };
            data.state = "冻结";
            $.ajax({
              url:'/api/cmssetclientuser',
              type: 'post',
              dataType: 'json',
              data:data,
              success:function(data){
                alert('冻结成功');
                location.reload();
              },
              error:function(){
                alert('冻结失败');
              }
            });
          });
          $(document).on('click','.delete',function(){
            var btn = $(this);
            var data = {
              user:_this.getUserData(btn)
            };
            $.ajax({
              url:'/api/cmsdeleteclientuser',
              type: 'post',
              dataType: 'json',
              data:data,
              success:function(data){
                alert('删除成功');
                location.reload();
              },
              error:function(){
                alert('删除失败');
              }
            });
          });
          $(document).on('click','.save',function(){
            var btn = $(this);
            var data = {
              user:_this.getUserData(btn)
            };
            $.ajax({
              url:'/api/cmssetclientuser',
              type: 'post',
              dataType: 'json',
              data:data,
              success:function(data){
                alert('保存成功');
                location.reload();
              },
              error:function(){
                alert('保存失败');
              }
            });
          });
          $(document).on('click','.add',function(){
            var btn = $(this);
            var data = {
              user:_this.getNewUserData(btn)
            };
            $.ajax({
              url:'/api/cmsaddclientuser',
              type: 'post',
              dataType: 'json',
              data:data,
              success:function(data){
                alert('添加成功');
                location.reload();
              },
              error:function(){
                alert('添加失败');
              }
            });
          });
        },
        getNewUserData:function(btn){
          var tr = $(btn).closest('tr');
          return {
            name:tr.find('.name').val(),
            cell:tr.find('.cell').val(),
            psw:tr.find('.psw').val(),
            realname:tr.find('.realname').val(),
            gender:tr.find('.gender').val(),
            mail:tr.find('.mail').val(),
            city:tr.find('.city').val(),
            company:tr.find('.company').val()
          }
        },
        getUserData:function(btn){
          var tr = $(btn).closest('tr');
          return{
            _id: tr.attr('id'),
            name: tr.find('.name').attr('data-info'),
            type: tr.find('.type').attr('data-info'),
            cell: tr.find('.cell').find('input').val(),
            psw: tr.find('.psw').attr('data-info'),
            realname: tr.find('.realname').attr('data-info'),
            gender: tr.find('.gender').attr('data-info'),
            mail: tr.find('.mail').attr('data-info'),
            cityname: tr.find('.cityname').attr('data-info'),
            company: tr.find('.company').attr('data-info'),
            created_at: tr.find('.created_at').attr('data-info'),
            receive: tr.find('.receive').attr('data-info'),
            state: tr.find('.state').attr('data-info')
          }
        }
      });
      var page = new view();
      page.render();
  });
});